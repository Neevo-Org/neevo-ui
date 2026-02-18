import { createContext, useCallback, useContext, useState } from 'react'
import './Tabs.css'

const TabsContext = createContext(null)

export function Tabs({ value, defaultValue, onValueChange, children, className = '', ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeValue = value !== undefined ? value : internalValue

  const setValue = useCallback((next) => {
    if (value === undefined) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }, [value, onValueChange])

  const contextValue = { activeValue, setValue }
  const classes = ['nv-tabs', className].filter(Boolean).join(' ')

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classes} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '', ...props }) {
  const classes = ['nv-tabs-list', className].filter(Boolean).join(' ')
  return <div className={classes} role="tablist" {...props}>{children}</div>
}

export function TabsTrigger({ value, children, className = '', disabled = false, ...props }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs.')
  const active = context.activeValue === value
  const classes = ['nv-tabs-trigger', active && 'nv-tabs-trigger--active', className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={classes}
      disabled={disabled}
      onClick={() => context.setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '', forceMount = false, ...props }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs.')
  const active = context.activeValue === value
  if (!active && !forceMount) return null
  const classes = ['nv-tabs-content', className].filter(Boolean).join(' ')
  return <div role="tabpanel" hidden={!active} className={classes} {...props}>{children}</div>
}
