import { useCallback, useEffect, useRef, useState } from 'react'
import { Text } from '../../typography/Text'
import './Slider.css'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function toStepped(value, min, max, step) {
  const raw = Number(value)
  if (!Number.isFinite(raw)) return min
  const snapped = Math.round((raw - min) / step) * step + min
  return clamp(snapped, min, max)
}

function normalizeRange(next, min, max, step) {
  if (!Array.isArray(next) || next.length < 2) return [min, max]
  const first = toStepped(next[0], min, max, step)
  const second = toStepped(next[1], min, max, step)
  return first <= second ? [first, second] : [second, first]
}

function getPercent(value, min, max) {
  if (max <= min) return 0
  return ((value - min) / (max - min)) * 100
}

export function Slider({
  label,
  hint,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  showValue = true,
  onChange,
  className = '',
  ...props
}) {
  const controlled = value !== undefined
  const [internal, setInternal] = useState(() => toStepped(defaultValue, min, max, step))
  const current = controlled ? toStepped(value, min, max, step) : internal
  const classes = ['nv-slider', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      {(label || showValue) ? (
        <span className="nv-slider-head">
          {label ? <Text as="span" size="sm" weight="semibold">{label}</Text> : <span />}
          {showValue ? <Text as="span" size="sm" tone="muted">{current}</Text> : null}
        </span>
      ) : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        className="nv-slider-input"
        onChange={(event) => {
          const next = toStepped(event.target.value, min, max, step)
          if (!controlled) setInternal(next)
          onChange?.(next, event)
        }}
        {...props}
      />
      {hint ? <Text as="span" size="xs" tone="muted">{hint}</Text> : null}
    </label>
  )
}

export function RangeSlider({
  label,
  hint,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [20, 80],
  showValue = true,
  onChange,
  className = '',
  ...restProps
}) {
  const controlled = value !== undefined
  const [internal, setInternal] = useState(() => normalizeRange(defaultValue, min, max, step))
  const [dragging, setDragging] = useState(null)
  const railRef = useRef(null)

  const current = controlled ? normalizeRange(value, min, max, step) : internal
  const startPercent = getPercent(current[0], min, max)
  const endPercent = getPercent(current[1], min, max)
  const classes = ['nv-slider', 'nv-range-slider', className].filter(Boolean).join(' ')

  const commit = useCallback((next, event) => {
    if (!controlled) setInternal(next)
    onChange?.(next, event)
  }, [controlled, onChange])

  const update = useCallback((index, nextValue, event) => {
    const parsed = toStepped(nextValue, min, max, step)
    let next
    if (index === 0) {
      next = normalizeRange([Math.min(parsed, current[1]), current[1]], min, max, step)
    } else {
      next = normalizeRange([current[0], Math.max(parsed, current[0])], min, max, step)
    }
    commit(next, event)
  }, [commit, current, min, max, step])

  const valueFromClientX = useCallback((clientX) => {
    const rect = railRef.current?.getBoundingClientRect()
    if (!rect || rect.width <= 0) return current[0]
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
    return toStepped(min + ratio * (max - min), min, max, step)
  }, [current, min, max, step])

  function pickThumb(nextValue) {
    const distStart = Math.abs(nextValue - current[0])
    const distEnd = Math.abs(nextValue - current[1])
    return distStart <= distEnd ? 0 : 1
  }

  useEffect(() => {
    if (dragging === null) return undefined

    function onPointerMove(event) {
      update(dragging, valueFromClientX(event.clientX), event)
    }

    function onPointerUp() {
      setDragging(null)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [dragging, update, valueFromClientX])

  function onRailPointerDown(event) {
    const nextValue = valueFromClientX(event.clientX)
    const thumb = pickThumb(nextValue)
    update(thumb, nextValue, event)
    setDragging(thumb)
  }

  function onThumbKeyDown(index, event) {
    const multiplier = event.shiftKey ? 10 : 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      update(index, current[index] - step * multiplier, event)
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      update(index, current[index] + step * multiplier, event)
    } else if (event.key === 'Home') {
      event.preventDefault()
      update(index, min, event)
    } else if (event.key === 'End') {
      event.preventDefault()
      update(index, max, event)
    }
  }

  return (
    <label className={classes} {...restProps}>
      {(label || showValue) ? (
        <span className="nv-slider-head">
          {label ? <Text as="span" size="sm" weight="semibold">{label}</Text> : <span />}
          {showValue ? <Text as="span" size="sm" tone="muted">{current[0]} - {current[1]}</Text> : null}
        </span>
      ) : null}
      <span className="nv-range-track" ref={railRef} onPointerDown={onRailPointerDown}>
        <span className="nv-range-track-fill" style={{ left: `${startPercent}%`, width: `${Math.max(endPercent - startPercent, 0)}%` }} />
        <button
          type="button"
          className="nv-range-thumb"
          style={{ left: `${startPercent}%` }}
          aria-label="Minimum value"
          aria-valuemin={min}
          aria-valuemax={current[1]}
          aria-valuenow={current[0]}
          onPointerDown={(event) => {
            event.stopPropagation()
            setDragging(0)
          }}
          onKeyDown={(event) => onThumbKeyDown(0, event)}
        />
        <button
          type="button"
          className="nv-range-thumb"
          style={{ left: `${endPercent}%` }}
          aria-label="Maximum value"
          aria-valuemin={current[0]}
          aria-valuemax={max}
          aria-valuenow={current[1]}
          onPointerDown={(event) => {
            event.stopPropagation()
            setDragging(1)
          }}
          onKeyDown={(event) => onThumbKeyDown(1, event)}
        />
      </span>
      {hint ? <Text as="span" size="xs" tone="muted">{hint}</Text> : null}
    </label>
  )
}
