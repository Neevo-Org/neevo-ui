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
import './Menu.css'

const MenuContext = createContext(null)

const MENU_MIN_WIDTHS = {
  sm: 160,
  md: 192,
  lg: 240,
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

export function Menu({ open, defaultOpen = false, onOpenChange, children, className = '', ...props }) {
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

  const classes = ['nv-menu', className].filter(Boolean).join(' ')

  return (
    <MenuContext.Provider value={{ contentRef, isOpen, rootRef, setOpen, triggerRef }}>
      <div ref={rootRef} className={classes} {...props}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

export const DropdownMenu = Menu

export function MenuTrigger({ children }) {
  const context = useContext(MenuContext)
  if (!context) throw new Error('MenuTrigger must be used within Menu.')

  const child = getSingleElementChild(children)

  if (!child) {
    return (
      <span
        ref={context.triggerRef}
        className="nv-menu-trigger-shell"
        role="button"
        tabIndex={0}
        aria-expanded={context.isOpen}
        aria-haspopup="menu"
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
    'aria-haspopup': 'menu',
  })
}

export function MenuContent({
  children,
  className = '',
  align = 'auto',
  size = 'md',
  surface = 'default',
  offset = 6,
  ...props
}) {
  const context = useContext(MenuContext)
  if (!context) throw new Error('MenuContent must be used within Menu.')

  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    if (!context.isOpen || !context.triggerRef.current) return undefined

    const updatePosition = () => {
      const rect = context.triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      const contentWidth = context.contentRef.current?.getBoundingClientRect().width ?? MENU_MIN_WIDTHS[size] ?? MENU_MIN_WIDTHS.md

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

  const alignClass = align === 'end' ? 'nv-menu-content--end' : align === 'center' ? 'nv-menu-content--center' : 'nv-menu-content--start'
  const classes = ['nv-menu-content', alignClass, `nv-menu-content--${size}`, `nv-menu-content--surface-${surface}`, className].filter(Boolean).join(' ')

  const style =
    position === null
      ? undefined
      : { position: 'fixed', top: `${position.top}px`, left: `${position.left}px` }

  return createPortal(
    <div ref={context.contentRef} className={classes} role="menu" style={style} {...props}>
      {children}
    </div>,
    document.body,
  )
}

export function MenuItem({ onSelect, children, className = '', disabled = false, ...props }) {
  const context = useContext(MenuContext)
  if (!context) throw new Error('MenuItem must be used within Menu.')

  const classes = ['nv-menu-item', className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={classes}
      role="menuitem"
      disabled={disabled}
      onClick={(event) => {
        onSelect?.(event)
        if (!event.defaultPrevented) context.setOpen(false)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function MenuSeparator({ className = '', ...props }) {
  const classes = ['nv-menu-separator', className].filter(Boolean).join(' ')
  return <div className={classes} role="separator" {...props} />
}
