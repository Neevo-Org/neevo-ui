import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useRef, useState } from 'react'
import './Popover.css'

const PopoverContext = createContext(null)

export function Popover({ open, defaultOpen = false, onOpenChange, children, className = '', ...props }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const rootRef = useRef(null)
  const isOpen = open !== undefined ? open : internalOpen

  const setOpen = useCallback((next) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!isOpen) return undefined
    function onDown(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [isOpen, setOpen])

  const contextValue = { isOpen, setOpen }
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
  const child = Children.only(children)
  if (!isValidElement(child)) throw new Error('PopoverTrigger requires a valid child element.')
  return cloneElement(child, {
    onClick: (e) => {
      child.props.onClick?.(e)
      context.setOpen(!context.isOpen)
    },
    'aria-expanded': context.isOpen,
  })
}

export function PopoverContent({ children, className = '', align = 'start', ...props }) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('PopoverContent must be used within Popover.')
  if (!context.isOpen) return null

  const alignClass = align === 'end' ? 'nv-popover-content--end' : align === 'center' ? 'nv-popover-content--center' : 'nv-popover-content--start'
  const classes = ['nv-popover-content', alignClass, className].filter(Boolean).join(' ')
  return <div className={classes} {...props}>{children}</div>
}
