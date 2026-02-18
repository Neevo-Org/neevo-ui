import { useState } from 'react'
import { I } from '../../typography/I'
import './TagInput.css'

function normalize(value) {
  if (!Array.isArray(value)) return []
  return value.filter(Boolean).map((v) => String(v).trim()).filter(Boolean)
}

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Add tag...',
  separators = [',', 'Enter'],
  className = '',
  ...props
}) {
  const [internalTags, setInternalTags] = useState(() => normalize(defaultValue))
  const [inputValue, setInputValue] = useState('')

  const tags = value !== undefined ? normalize(value) : internalTags

  function update(next) {
    if (value === undefined) setInternalTags(next)
    onChange?.(next)
  }

  function addTag(raw) {
    const nextTag = String(raw ?? '').trim()
    if (!nextTag) return
    if (tags.includes(nextTag)) return
    update([...tags, nextTag])
    setInputValue('')
  }

  function removeTag(tag) {
    update(tags.filter((item) => item !== tag))
  }

  function onKeyDown(event) {
    if (separators.includes(event.key)) {
      event.preventDefault()
      addTag(inputValue)
      return
    }
    if (event.key === 'Backspace' && !inputValue && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  const classes = ['nv-tag-input', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {tags.map((tag) => (
        <span key={tag} className="nv-tag-input-chip">
          {tag}
          <button type="button" className="nv-tag-input-remove" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
            <I className="nv-tag-input-remove-icon">close</I>
          </button>
        </span>
      ))}
      <input
        className="nv-tag-input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => addTag(inputValue)}
        placeholder={placeholder}
      />
    </div>
  )
}
