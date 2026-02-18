import { createContext, useCallback, useContext, useState } from 'react'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Accordion.css'

const AccordionContext = createContext(null)

function normalizeValue(value) {
  if (value === undefined || value === null) {
    return []
  }
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

export function Accordion({
  children,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  className = '',
  ...props
}) {
  const [internalValue, setInternalValue] = useState(() => normalizeValue(defaultValue))
  const controlled = value !== undefined
  const openValues = controlled ? normalizeValue(value) : internalValue

  const setOpenValues = useCallback((nextValues) => {
    if (!controlled) {
      setInternalValue(nextValues)
    }
    onValueChange?.(multiple ? nextValues : (nextValues[0] ?? null))
  }, [controlled, multiple, onValueChange])

  const toggleItem = useCallback((itemValue) => {
    const isOpen = openValues.includes(itemValue)
    if (multiple) {
      const next = isOpen ? openValues.filter((entry) => entry !== itemValue) : [...openValues, itemValue]
      setOpenValues(next)
      return
    }
    setOpenValues(isOpen ? [] : [itemValue])
  }, [multiple, openValues, setOpenValues])

  const contextValue = { openValues, toggleItem }
  const classes = ['nv-accordion', className].filter(Boolean).join(' ')

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={classes} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  value,
  title,
  children,
  disabled = false,
  className = '',
  ...props
}) {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('AccordionItem must be used within Accordion.')
  }

  const isOpen = context.openValues.includes(value)
  const itemClasses = ['nv-accordion-item', className].filter(Boolean).join(' ')
  const contentId = `nv-accordion-panel-${String(value)}`
  const triggerId = `nv-accordion-trigger-${String(value)}`

  return (
    <section className={itemClasses} {...props}>
      <button
        type="button"
        className="nv-accordion-trigger"
        id={triggerId}
        onClick={() => context.toggleItem(value)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
      >
        <Text as="span" weight="semibold">
          {title}
        </Text>
        <I className={isOpen ? 'nv-accordion-icon nv-accordion-icon--open' : 'nv-accordion-icon'}>expand_more</I>
      </button>
      <div
        id={contentId}
        className={isOpen ? 'nv-accordion-panel nv-accordion-panel--open' : 'nv-accordion-panel'}
        role="region"
        aria-labelledby={triggerId}
      >
        <div className="nv-accordion-content">
          {children}
        </div>
      </div>
    </section>
  )
}
