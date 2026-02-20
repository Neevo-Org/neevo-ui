import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import { useBodyScrollLock } from '../shared/useBodyScrollLock'
import './CommandPalette.css'

export function CommandPalette({
  items = [],
  open,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  placeholder = 'Search commands...',
  emptyText = 'No command found.',
  hotkey = 'k',
  hotkeyMeta = true,
  className = '',
  ...props
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const isOpen = open !== undefined ? open : internalOpen

  const setOpen = useCallback((next) => {
    if (open === undefined) setInternalOpen(next)
    if (!next) {
      setQuery('')
    }
    onOpenChange?.(next)
  }, [open, onOpenChange])

  useEffect(() => {
    function onKeyDown(event) {
      const target = event.target
      const isTypingContext = target instanceof HTMLElement && (
        target.tagName === 'INPUT'
        || target.tagName === 'TEXTAREA'
        || target.isContentEditable
      )

      if (isTypingContext && !isOpen) {
        return
      }

      const usesMeta = hotkeyMeta ? event.metaKey || event.ctrlKey : true
      if (usesMeta && event.key.toLowerCase() === hotkey.toLowerCase()) {
        event.preventDefault()
        setOpen(true)
        setActiveIndex(0)
      }
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [hotkey, hotkeyMeta, isOpen, setOpen])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => {
      const label = String(item.label ?? '').toLowerCase()
      const keywords = String(item.keywords ?? '').toLowerCase()
      return label.includes(normalized) || keywords.includes(normalized)
    })
  }, [items, query])

  useBodyScrollLock(isOpen)

  function selectAt(index) {
    const item = filtered[index]
    if (!item) return
    onSelect?.(item)
    setOpen(false)
    setQuery('')
  }

  if (!isOpen) return null

  const classes = ['nv-command-palette', className].filter(Boolean).join(' ')

  const content = (
    <div className="nv-command-palette-backdrop" onClick={() => setOpen(false)}>
      <section
        className={classes}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        {...props}
      >
        <label className="nv-command-input-wrap">
          <I>search</I>
          <input
            className="nv-command-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((prev) => Math.max(prev - 1, 0))
              } else if (event.key === 'Enter') {
                event.preventDefault()
                selectAt(activeIndex)
              } else if (event.key === 'Escape') {
                event.preventDefault()
                setOpen(false)
              }
            }}
            placeholder={placeholder}
            autoFocus
          />
        </label>
        <div className="nv-command-list" role="listbox">
          {filtered.length === 0 ? <Text tone="muted" size="sm">{emptyText}</Text> : null}
          {filtered.map((item, index) => (
            <button
              key={item.id ?? item.label}
              type="button"
              className={index === activeIndex ? 'nv-command-item nv-command-item--active' : 'nv-command-item'}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectAt(index)}
            >
              {item.icon ? <I>{item.icon}</I> : null}
              <span className="nv-command-copy">
                <Text as="span" weight="semibold">{item.label}</Text>
                {item.description ? <Text as="span" size="sm" tone="muted">{item.description}</Text> : null}
              </span>
              {item.shortcut ? <kbd className="nv-command-shortcut">{item.shortcut}</kbd> : null}
            </button>
          ))}
        </div>
      </section>
    </div>
  )

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(content, document.body)
  }
  return content
}
