import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useRef, useState } from 'react'
import './Menu.css'

const MenuContext = createContext(null)

export function Menu({ open, defaultOpen = false, onOpenChange, children, className = '', ...props }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const rootRef = useRef(null)
  const isOpen = open !== undefined ? open : internalOpen

  const setOpen = useCallback((next) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!isOpen) return undefined

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
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
    <MenuContext.Provider value={{ isOpen, setOpen }}>
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

  const child = Children.only(children)
  if (!isValidElement(child)) throw new Error('MenuTrigger requires a valid child element.')

  return cloneElement(child, {
    onClick: (event) => {
      child.props.onClick?.(event)
      context.setOpen(!context.isOpen)
    },
    'aria-expanded': context.isOpen,
    'aria-haspopup': 'menu',
  })
}

export function MenuContent({ children, className = '', align = 'start', ...props }) {
  const context = useContext(MenuContext)
  if (!context) throw new Error('MenuContent must be used within Menu.')
  if (!context.isOpen) return null

  const alignClass = align === 'end' ? 'nv-menu-content--end' : align === 'center' ? 'nv-menu-content--center' : 'nv-menu-content--start'
  const classes = ['nv-menu-content', alignClass, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="menu" {...props}>
      {children}
    </div>
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
