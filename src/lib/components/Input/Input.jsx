import { I } from '../I'
import { Text } from '../Text'
import './Input.css'

function sanitizeInteger(raw) {
  const value = String(raw ?? '')
  let result = value.replace(/[^\d-]/g, '')
  result = result.replace(/(?!^)-/g, '')
  return result
}

function sanitizeFloat(raw) {
  const value = String(raw ?? '')
  let result = value.replace(/[^\d.-]/g, '')
  result = result.replace(/(?!^)-/g, '')

  const dotIndex = result.indexOf('.')
  if (dotIndex !== -1) {
    const beforeDot = result.slice(0, dotIndex + 1)
    const afterDot = result.slice(dotIndex + 1).replace(/\./g, '')
    result = `${beforeDot}${afterDot}`
  }

  return result
}

function clampNumberValue(raw, { min, max, kind }) {
  if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
    return raw
  }

  const parsed = Number(raw)
  if (Number.isNaN(parsed)) {
    return raw
  }

  const parsedMin = min !== undefined && min !== null ? Number(min) : undefined
  const parsedMax = max !== undefined && max !== null ? Number(max) : undefined

  let value = parsed
  if (!Number.isNaN(parsedMin)) {
    value = Math.max(parsedMin, value)
  }
  if (!Number.isNaN(parsedMax)) {
    value = Math.min(parsedMax, value)
  }
  if (kind === 'integer') {
    value = Math.trunc(value)
  }
  return String(value)
}

export function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  mode = 'text',
  min,
  max,
  maxLength,
  type,
  inputMode,
  pattern,
  onChange,
  onBlur,
  disabled,
  dissabled,
  className = '',
  inputClassName = '',
  ...props
}) {
  const isNumericMode = mode === 'integer' || mode === 'float'
  const resolvedDisabled = Boolean(disabled || dissabled)

  function handleChange(event) {
    let nextValue = event.target.value

    if (mode === 'integer') {
      nextValue = sanitizeInteger(nextValue)
    } else if (mode === 'float') {
      nextValue = sanitizeFloat(nextValue)
    }

    if (typeof maxLength === 'number' && nextValue.length > maxLength) {
      nextValue = nextValue.slice(0, maxLength)
    }

    if (nextValue !== event.target.value) {
      event.target.value = nextValue
    }

    onChange?.(event)
  }

  function handleBlur(event) {
    if (isNumericMode) {
      const previousValue = event.target.value
      const clamped = clampNumberValue(event.target.value, { min, max, kind: mode })
      if (clamped !== previousValue) {
        event.target.value = clamped
        onChange?.({
          ...event,
          target: event.target,
          currentTarget: event.target,
        })
      }
    }
    onBlur?.(event)
  }

  const wrapperClass = ['nv-field', className].filter(Boolean).join(' ')
  const controlClass = ['nv-input-control', error && 'nv-input-control--error', resolvedDisabled && 'nv-input-control--disabled', inputClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={wrapperClass}>
      {label && (
        <Text as="span" size="sm" weight="semibold" className="nv-field-label">
          {label}
        </Text>
      )}
      <span className={controlClass}>
        {leadingIcon && (
          <span className="nv-input-icon" aria-hidden>
            <I>{leadingIcon}</I>
          </span>
        )}
        <input
          className="nv-input-element"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={resolvedDisabled}
          type={isNumericMode ? 'text' : type}
          maxLength={maxLength}
          min={min}
          max={max}
          inputMode={mode === 'integer' ? 'numeric' : mode === 'float' ? 'decimal' : inputMode}
          pattern={mode === 'integer' ? '-?\\d*' : mode === 'float' ? '-?\\d*(\\.\\d*)?' : pattern}
          {...props}
        />
        {trailingIcon && (
          <span className="nv-input-icon" aria-hidden>
            <I>{trailingIcon}</I>
          </span>
        )}
      </span>
      {(hint || error) && (
        <Text as="span" size="xs" tone={error ? 'default' : 'muted'} className={error ? 'nv-field-error' : ''}>
          {error || hint}
        </Text>
      )}
    </label>
  )
}
