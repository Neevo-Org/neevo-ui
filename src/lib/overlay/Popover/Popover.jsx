import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import './Popover.css'

const PopoverContext = createContext(null)

const POPOVER_MIN_WIDTHS = {
  sm: 200,
  md: 240,
  lg: 320,
}

function getSingleElementChild(children) {
  const elements = Children.toArray(children).filter((child) => isValidElement(child))
  return elements.length === 1 ? elements[0] : null
}

function resolveFloatingPosition({ align, contentWidth, offset, rect, viewportWidth }) {
  const viewportPadding = 12
  const maxLeft = Math.max(viewportPadding, viewportWidth - contentWidth - viewportPadding)
  const preferredLeft =
    align === 'end'
      ? rect.right - contentWidth
      : align === 'center'
        ? rect.left + (rect.width - contentWidth) / 2
        : rect.left

  const startLeft = rect.left
  const endLeft = rect.right - contentWidth
  const centerLeft = rect.left + (rect.width - contentWidth) / 2

  let nextAlign = align
  let nextLeft = preferredLeft

  if (align === 'start' && preferredLeft + contentWidth > viewportWidth - viewportPadding) {
    nextAlign = 'end'
    nextLeft = endLeft
  } else if (align === 'end' && preferredLeft < viewportPadding) {
    nextAlign = 'start'
    nextLeft = startLeft
  } else if (align === 'center') {
    nextLeft = centerLeft
  }

  return {
    align: nextAlign,
    top: rect.bottom + offset,
    left: Math.min(Math.max(viewportPadding, nextLeft), maxLeft),
  }
}

export function Popover({ open, defaultOpen = false, onOpenChange, children, className = '', ...props }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const contentRef = useRef(null)
  const isOpen = open !== undefined ? open : internalOpen

  const setOpen = useCallback((next) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!isOpen) return undefined

    function onPointerDown(event) {
      const target = event.target
      const insideTrigger = rootRef.current?.contains(target)
      const insideContent = contentRef.current?.contains(target)
      if (!insideTrigger && !insideContent) setOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, setOpen])

  const contextValue = { contentRef, isOpen, rootRef, setOpen, triggerRef }
  const classes = ['nv-popover', className].filter(Boolean).join(' ')

  return (
    <PopoverContext.Provider value={contextValue}>
      <div ref={rootRef} className={classes} {...props}>{children}</div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children }) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('PopoverTrigger must be used within Popover.')

  const child = getSingleElementChild(children)

  if (!child) {
    return (
      <span
        ref={context.triggerRef}
        className="nv-popover-trigger-shell"
        role="button"
        tabIndex={0}
        aria-expanded={context.isOpen}
        aria-haspopup="dialog"
        onClick={() => context.setOpen(!context.isOpen)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            context.setOpen(!context.isOpen)
          }
        }}
      >
        {children}
      </span>
    )
  }

  return cloneElement(child, {
    ref: context.triggerRef,
    onClick: (event) => {
      child.props.onClick?.(event)
      context.setOpen(!context.isOpen)
    },
    'aria-expanded': context.isOpen,
    'aria-haspopup': 'dialog',
  })
}

export function PopoverContent({
  children,
  className = '',
  align = 'auto',
  size = 'md',
  surface = 'default',
  offset = 8,
  ...props
}) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('PopoverContent must be used within Popover.')

  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    if (!context.isOpen || !context.triggerRef.current) return undefined

    const updatePosition = () => {
      const rect = context.triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      const contentWidth = context.contentRef.current?.getBoundingClientRect().width ?? POPOVER_MIN_WIDTHS[size] ?? POPOVER_MIN_WIDTHS.md

      setPosition(resolveFloatingPosition({
        align,
        contentWidth,
        offset,
        rect,
        viewportWidth: window.innerWidth,
      }))
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [align, context.contentRef, context.isOpen, context.triggerRef, offset, size])

  if (!context.isOpen) return null

  const alignClass =
    align === 'end'
      ? 'nv-popover-content--end'
      : align === 'center'
        ? 'nv-popover-content--center'
        : 'nv-popover-content--start'

  const classes = [
    'nv-popover-content',
    alignClass,
    `nv-popover-content--${size}`,
    `nv-popover-content--surface-${surface}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style =
    position === null
      ? undefined
      : { position: 'fixed', top: `${position.top}px`, left: `${position.left}px` }

  return createPortal(
    <div ref={context.contentRef} className={classes} style={style} {...props}>
      {children}
    </div>,
    document.body,
  )
}
