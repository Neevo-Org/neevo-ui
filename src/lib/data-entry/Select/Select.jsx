import { Children, isValidElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Select.css'

export function Options() {
  return null
}

function readTextContent(node) {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) {
    return node.map(readTextContent).join('')
  }
  if (isValidElement(node)) {
    return readTextContent(node.props?.children)
  }
  return ''
}

function getOptionLabel(option) {
  const childText = readTextContent(option.props.children).trim()
  if (childText) return childText
  return option.props.label ?? ''
}

export function Select({
  label,
  hint,
  error,
  value,
  onChange,
  children,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  noResultsText = 'No options found',
  search = true,
  searchable,
  variant = 'default',
  shell = false,
  className = '',
  disabled = false,
  ...props
}) {
  const rootRef = useRef(null)
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState(null)

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
      const target = event.target
      const insideTrigger = rootRef.current?.contains(target)
      const insideMenu = menuRef.current?.contains(target)
      if (!insideTrigger && !insideMenu) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useLayoutEffect(() => {
    if (!open || !rootRef.current) return undefined

    const updatePosition = () => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return

      setPosition({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      })
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
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

  const rootClassName = [
    'nv-field',
    'nv-select',
    variant !== 'default' && `nv-field--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const triggerClassName = [
    'nv-select-trigger',
    variant !== 'default' && `nv-select-trigger--${variant}`,
    shell && 'nv-select-trigger--shell',
    error && 'nv-select-trigger--error',
    disabled && 'nv-select-trigger--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName} ref={rootRef} {...props}>
      {label && (
        <Text as="span" size="sm" weight="semibold" className="nv-field-label">
          {label}
        </Text>
      )}

      <button
        type="button"
        className={triggerClassName}
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <Text as="span" size="sm" className={selected ? 'nv-select-value' : 'nv-select-placeholder'}>
          {selected ? getOptionLabel(selected) : placeholder}
        </Text>
        <I className="nv-select-caret">expand_more</I>
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          className="nv-select-menu"
          style={
            position === null
              ? undefined
              : {
                  position: 'fixed',
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  width: `${position.width}px`,
                }
          }
        >
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
                <button
                  key={String(option.props.value)}
                  type="button"
                  className={optionClassName}
                  onClick={() => handleSelect(option.props.value)}
                  role="option"
                  aria-selected={isActive}
                >
                  <Text as="span" size="sm" className="nv-select-option-label">
                    {getOptionLabel(option)}
                  </Text>
                </button>
              )
            })}
          </div>
        </div>,
        document.body,
      )}

      {(hint || error) && (
        <Text as="span" size="xs" tone={error ? 'default' : 'muted'} className={error ? 'nv-field-error' : ''}>
          {error || hint}
        </Text>
      )}
    </div>
  )
}

