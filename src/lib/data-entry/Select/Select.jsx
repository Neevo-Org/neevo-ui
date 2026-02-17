import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Select.css'

export function Options() {
  return null
}

function getOptionLabel(option) {
  if (typeof option.props.children === 'string') {
    return option.props.children
  }
  return option.props.label ?? ''
}

export function Select({
  value,
  onChange,
  children,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  noResultsText = 'No options found',
  search = true,
  searchable,
  className = '',
  disabled = false,
  ...props
}) {
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const options = useMemo(() => {
    return Children.toArray(children).filter((child) => isValidElement(child) && child.type === Options)
  }, [children])

  const selected = useMemo(() => {
    return options.find((option) => option.props.value === value)
  }, [options, value])

  const isSearchEnabled = searchable ?? search

  const filteredOptions = useMemo(() => {
    if (!isSearchEnabled || !query.trim()) {
      return options
    }

    const normalizedQuery = query.trim().toLowerCase()
    return options.filter((option) => {
      const label = getOptionLabel(option).toLowerCase()
      const keywords = String(option.props.keywords ?? '').toLowerCase()
      return label.includes(normalizedQuery) || keywords.includes(normalizedQuery)
    })
  }, [isSearchEnabled, options, query])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  function handleToggle() {
    if (disabled) {
      return
    }
    setOpen((prev) => !prev)
    if (!open) {
      setQuery('')
    }
  }

  function handleSelect(nextValue) {
    onChange?.(nextValue)
    setOpen(false)
    setQuery('')
  }

  const rootClassName = ['nv-select', className].filter(Boolean).join(' ')

  return (
    <div className={rootClassName} ref={rootRef} {...props}>
      <Button
        variant="secondary"
        className="nv-select-trigger"
        onClick={handleToggle}
        aria-expanded={open}
        disabled={disabled}
      >
        <Text as="span" size="sm" className={selected ? 'nv-select-value' : 'nv-select-placeholder'}>
          {selected ? getOptionLabel(selected) : placeholder}
        </Text>
        <I className="nv-select-caret">expand_more</I>
      </Button>

      {open && (
        <div className="nv-select-menu">
          {isSearchEnabled && (
            <input
              className="nv-select-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
            />
          )}
          <div className="nv-select-options">
            {filteredOptions.length === 0 && (
              <Text size="sm" tone="muted" className="nv-select-empty">
                {noResultsText}
              </Text>
            )}
            {filteredOptions.map((option) => {
              const isActive = option.props.value === value
              const optionClassName = ['nv-select-option', isActive && 'nv-select-option--active']
                .filter(Boolean)
                .join(' ')

              return (
                <Button
                  key={String(option.props.value)}
                  variant="secondary"
                  className={optionClassName}
                  onClick={() => handleSelect(option.props.value)}
                >
                  <Text as="span" size="sm" className="nv-select-option-label">
                    {getOptionLabel(option)}
                  </Text>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

