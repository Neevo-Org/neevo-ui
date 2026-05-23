import { createContext, useCallback, useContext, useId, useMemo, useState } from 'react'
import './Tabs.css'

const TabsContext = createContext(null)

function toDomSafeValue(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const instanceId = useId()
  const activeValue = value !== undefined ? value : internalValue

  const setValue = useCallback((next) => {
    if (value === undefined) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }, [value, onValueChange])

  const getTriggerId = useCallback((tabValue) => `${instanceId}-tab-${toDomSafeValue(tabValue)}`, [instanceId])
  const getPanelId = useCallback((tabValue) => `${instanceId}-panel-${toDomSafeValue(tabValue)}`, [instanceId])
  const contextValue = useMemo(() => ({
    activeValue,
    setValue,
    size,
    variant,
    fullWidth,
    getTriggerId,
    getPanelId,
  }), [activeValue, fullWidth, getPanelId, getTriggerId, setValue, size, variant])
  const classes = ['nv-tabs', `nv-tabs--${variant}`, `nv-tabs--${size}`, fullWidth && 'nv-tabs--full-width', className]
    .filter(Boolean)
    .join(' ')

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classes} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '', ...props }) {
  const context = useContext(TabsContext)
  const classes = [
    'nv-tabs-list',
    context?.fullWidth && 'nv-tabs-list--full-width',
    className,
  ].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      role="tablist"
      onKeyDown={(event) => {
        const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]:not([disabled])'))
        const activeIndex = tabs.findIndex((tab) => tab === document.activeElement)

        if (tabs.length === 0) return

        let nextIndex = -1
        if (event.key === 'ArrowRight') {
          nextIndex = activeIndex >= 0 ? (activeIndex + 1) % tabs.length : 0
        } else if (event.key === 'ArrowLeft') {
          nextIndex = activeIndex >= 0 ? (activeIndex - 1 + tabs.length) % tabs.length : tabs.length - 1
        } else if (event.key === 'Home') {
          nextIndex = 0
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1
        }

        if (nextIndex === -1) return

        event.preventDefault()
        const nextTab = tabs[nextIndex]
        nextTab?.focus()
        nextTab?.click()
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children, className = '', disabled = false, ...props }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs.')
  const active = context.activeValue === value
  const classes = [
    'nv-tabs-trigger',
    active && 'nv-tabs-trigger--active',
    context.fullWidth && 'nv-tabs-trigger--full-width',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      id={context.getTriggerId(value)}
      role="tab"
      tabIndex={active ? 0 : -1}
      aria-selected={active}
      aria-controls={context.getPanelId(value)}
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
  return (
    <div
      id={context.getPanelId(value)}
      role="tabpanel"
      aria-labelledby={context.getTriggerId(value)}
      hidden={!active}
      tabIndex={0}
      className={classes}
      {...props}
    >
      {children}
    </div>
  )
}
