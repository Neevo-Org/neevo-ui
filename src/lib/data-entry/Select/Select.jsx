import { Children, isValidElement, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  const instanceId = useId()
  const rootRef = useRef(null)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)
  const searchRef = useRef(null)
  const optionRefs = useRef([])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const labelId = `${instanceId}-label`
  const triggerId = `${instanceId}-trigger`
  const listboxId = `${instanceId}-listbox`
  const hintId = hint ? `${instanceId}-hint` : undefined
  const errorId = error ? `${instanceId}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

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
  const selectedIndex = filteredOptions.findIndex((option) => option.props.value === value)
  const resolvedActiveIndex = filteredOptions.length === 0
    ? -1
    : activeIndex >= 0
      ? Math.min(activeIndex, filteredOptions.length - 1)
      : (selectedIndex >= 0 ? selectedIndex : 0)

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, filteredOptions.length)
  }, [filteredOptions.length])

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

  useEffect(() => {
    if (!open) return undefined

    function onDocumentKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onDocumentKeyDown)
    return () => document.removeEventListener('keydown', onDocumentKeyDown)
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

  useEffect(() => {
    if (!open) return

    if (isSearchEnabled && searchRef.current) {
      searchRef.current.focus()
      return
    }

    if (resolvedActiveIndex >= 0) {
      optionRefs.current[resolvedActiveIndex]?.focus()
    }
  }, [isSearchEnabled, open, resolvedActiveIndex])

  function focusOption(index) {
    if (filteredOptions.length === 0) return
    const nextIndex = Math.max(0, Math.min(index, filteredOptions.length - 1))
    setActiveIndex(nextIndex)
    optionRefs.current[nextIndex]?.focus()
  }

  function moveActive(step) {
    if (filteredOptions.length === 0) return
    const start = activeIndex >= 0 ? activeIndex : 0
    const nextIndex = (start + step + filteredOptions.length) % filteredOptions.length
    focusOption(nextIndex)
  }

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
    setActiveIndex(-1)
    triggerRef.current?.focus()
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
        <Text as="span" id={labelId} size="sm" weight="semibold" className="nv-field-label">
          {label}
        </Text>
      )}

      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        onClick={handleToggle}
        onKeyDown={(event) => {
          if (disabled) return

          if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (!open) {
              setOpen(true)
            } else {
              moveActive(1)
            }
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (!open) {
              setOpen(true)
            } else {
              moveActive(-1)
            }
          } else if ((event.key === 'Enter' || event.key === ' ') && !open) {
            event.preventDefault()
            setOpen(true)
          }
        }}
        aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
        aria-describedby={describedBy}
        aria-controls={listboxId}
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
              ref={searchRef}
              className="nv-select-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                   focusOption(resolvedActiveIndex >= 0 ? resolvedActiveIndex : 0)
                 } else if (event.key === 'ArrowUp') {
                   event.preventDefault()
                   focusOption(resolvedActiveIndex >= 0 ? resolvedActiveIndex : filteredOptions.length - 1)
                 } else if (event.key === 'Home') {
                  event.preventDefault()
                  focusOption(0)
                } else if (event.key === 'End') {
                  event.preventDefault()
                  focusOption(filteredOptions.length - 1)
                }
              }}
              placeholder={searchPlaceholder}
            />
          )}
          <div
            id={listboxId}
            className="nv-select-options"
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
          >
            {filteredOptions.length === 0 && (
              <Text size="sm" tone="muted" className="nv-select-empty">
                {noResultsText}
              </Text>
            )}
            {filteredOptions.map((option, index) => {
              const isActive = option.props.value === value
              const optionClassName = ['nv-select-option', isActive && 'nv-select-option--active']
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={String(option.props.value)}
                  ref={(node) => {
                    optionRefs.current[index] = node
                  }}
                  type="button"
                  id={`${instanceId}-option-${index}`}
                  className={optionClassName}
                  onClick={() => handleSelect(option.props.value)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      moveActive(1)
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      moveActive(-1)
                    } else if (event.key === 'Home') {
                      event.preventDefault()
                      focusOption(0)
                    } else if (event.key === 'End') {
                      event.preventDefault()
                      focusOption(filteredOptions.length - 1)
                    } else if (event.key === 'Escape') {
                      event.preventDefault()
                      setOpen(false)
                      triggerRef.current?.focus()
                    }
                  }}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={resolvedActiveIndex === index ? 0 : -1}
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
        <Text
          as="span"
          id={error ? errorId : hintId}
          size="xs"
          tone={error ? 'default' : 'muted'}
          className={error ? 'nv-field-error' : ''}
        >
          {error || hint}
        </Text>
      )}
    </div>
  )
}

