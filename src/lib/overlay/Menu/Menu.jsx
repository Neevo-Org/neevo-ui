import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
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

const MENU_ITEM_SELECTOR = '[data-nv-menu-item="true"]:not([disabled])'

function getEnabledItems(container) {
  if (!(container instanceof HTMLElement)) {
    return []
  }

  return Array.from(container.querySelectorAll(MENU_ITEM_SELECTOR))
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

  let nextLeft = preferredLeft

  if (align === 'start' || align === 'auto') {
    nextLeft = preferredLeft + contentWidth > viewportWidth - viewportPadding ? endLeft : startLeft
  } else if (align === 'end') {
    nextLeft = preferredLeft < viewportPadding ? startLeft : endLeft
  } else if (align === 'center') {
    nextLeft = centerLeft
  }

  return {
    top: rect.bottom + offset,
    left: Math.min(Math.max(viewportPadding, nextLeft), maxLeft),
  }
}

export function Menu({ open, defaultOpen = false, onOpenChange, children, className = '', ...props }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const contentRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const contentId = useId()
  const isOpen = open !== undefined ? open : internalOpen

  const setOpen = useCallback((next) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!isOpen) return undefined

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const firstItem = getEnabledItems(contentRef.current)[0]
    firstItem?.focus()

    function onPointerDown(event) {
      const target = event.target
      const insideRoot = rootRef.current?.contains(target)
      const insideFloating = target instanceof HTMLElement && target.closest('[data-nv-menu-floating="true"]')
      if (!insideRoot && !insideFloating) setOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      restoreFocusRef.current?.focus?.()
      restoreFocusRef.current = null
    }
  }, [isOpen, setOpen])

  const classes = ['nv-menu', className].filter(Boolean).join(' ')
  const contextValue = useMemo(() => ({ isOpen, rootRef, triggerRef, contentRef, setOpen, contentId }), [contentId, isOpen, setOpen])

  return (
    <MenuContext.Provider value={contextValue}>
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

  const { isOpen, setOpen, triggerRef, contentId } = context
  const child = getSingleElementChild(children)

  if (!child) {
    return (
      <span
        ref={triggerRef}
        data-nv-menu-trigger="true"
        className="nv-menu-trigger-shell"
        role="button"
        tabIndex={0}
        aria-controls={contentId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setOpen(!isOpen)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      ref={triggerRef}
      data-nv-menu-trigger="true"
      className="nv-menu-trigger-shell"
      onClick={() => setOpen(!isOpen)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setOpen(true)
        }
      }}
    >
      {cloneElement(child, {
        'aria-controls': contentId,
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu',
      })}
    </span>
  )
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

  const { isOpen, rootRef, contentRef, setOpen, contentId } = context
  const [position, setPosition] = useState(null)

  useLayoutEffect(() => {
    if (!isOpen) return undefined

    const updatePosition = () => {
      const trigger = rootRef.current?.querySelector('[data-nv-menu-trigger="true"]')
      const rect = trigger?.getBoundingClientRect()
      if (!rect) return

      const contentWidth = contentRef.current?.getBoundingClientRect().width ?? MENU_MIN_WIDTHS[size] ?? MENU_MIN_WIDTHS.md

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
  }, [align, contentRef, isOpen, offset, rootRef, size])

  if (!isOpen) return null

  const alignClass = align === 'end' ? 'nv-menu-content--end' : align === 'center' ? 'nv-menu-content--center' : 'nv-menu-content--start'
  const classes = ['nv-menu-content', alignClass, `nv-menu-content--${size}`, `nv-menu-content--surface-${surface}`, className].filter(Boolean).join(' ')
  const style = position === null ? undefined : { position: 'fixed', top: `${position.top}px`, left: `${position.left}px` }

  return createPortal(
    <div
      id={contentId}
      ref={contentRef}
      data-nv-menu-floating="true"
      className={classes}
      role="menu"
      style={style}
      onKeyDown={(event) => {
        const items = getEnabledItems(contentRef.current)
        const activeIndex = items.findIndex((item) => item === document.activeElement)

        if (event.key === 'Escape') {
          event.preventDefault()
          setOpen(false)
          return
        }

        if (event.key === 'Tab') {
          setOpen(false)
          return
        }

        if (items.length === 0) return

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % items.length : 0
          items[nextIndex].focus()
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          const nextIndex = activeIndex >= 0 ? (activeIndex - 1 + items.length) % items.length : items.length - 1
          items[nextIndex].focus()
        } else if (event.key === 'Home') {
          event.preventDefault()
          items[0].focus()
        } else if (event.key === 'End') {
          event.preventDefault()
          items[items.length - 1].focus()
        }
      }}
      {...props}
    >
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
      data-nv-menu-item="true"
      type="button"
      className={classes}
      role="menuitem"
      tabIndex={-1}
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
