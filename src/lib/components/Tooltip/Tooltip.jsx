import { Children, isValidElement, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Text } from '../Text'
import './Tooltip.css'

function getPlacementPosition(placement, triggerRect, tooltipRect, offset) {
  const [side, align = 'center'] = placement.split('-')
  let top = 0
  let left = 0

  if (side === 'top') {
    top = triggerRect.top - tooltipRect.height - offset
    left = align === 'start' ? triggerRect.left : align === 'end' ? triggerRect.right - tooltipRect.width : triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  } else if (side === 'bottom') {
    top = triggerRect.bottom + offset
    left = align === 'start' ? triggerRect.left : align === 'end' ? triggerRect.right - tooltipRect.width : triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  } else if (side === 'left') {
    left = triggerRect.left - tooltipRect.width - offset
    top = align === 'start' ? triggerRect.top : align === 'end' ? triggerRect.bottom - tooltipRect.height : triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
  } else {
    left = triggerRect.right + offset
    top = align === 'start' ? triggerRect.top : align === 'end' ? triggerRect.bottom - tooltipRect.height : triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
  }

  return { top, left, side, align }
}

function clampPosition(position, tooltipRect) {
  const padding = 8
  return {
    top: Math.max(padding, Math.min(position.top, window.innerHeight - tooltipRect.height - padding)),
    left: Math.max(padding, Math.min(position.left, window.innerWidth - tooltipRect.width - padding)),
  }
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  trigger = ['hover', 'focus'],
  open,
  defaultOpen = false,
  onOpenChange,
  offset = 8,
  showDelay = 120,
  hideDelay = 80,
  disabled = false,
  interactive = false,
  arrow = true,
  maxWidth = 280,
  className = '',
}) {
  const child = Children.only(children)
  if (!isValidElement(child)) {
    return null
  }

  const triggerModes = useMemo(() => (Array.isArray(trigger) ? trigger : [trigger]), [trigger])
  const isControlled = typeof open === 'boolean'
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? open : internalOpen

  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const showTimeoutRef = useRef(null)
  const hideTimeoutRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0, side: 'top', align: 'center' })
  const tooltipId = useId()

  function setOpenState(next) {
    if (disabled) {
      return
    }
    if (!isControlled) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }

  function clearTimers() {
    window.clearTimeout(showTimeoutRef.current)
    window.clearTimeout(hideTimeoutRef.current)
  }

  function scheduleOpen() {
    clearTimers()
    showTimeoutRef.current = window.setTimeout(() => setOpenState(true), showDelay)
  }

  function scheduleClose() {
    clearTimers()
    hideTimeoutRef.current = window.setTimeout(() => setOpenState(false), hideDelay)
  }

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) {
      return
    }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const next = getPlacementPosition(placement, triggerRect, tooltipRect, offset)
    const clamped = clampPosition(next, tooltipRect)
    setPosition({ top: clamped.top, left: clamped.left, side: next.side, align: next.align })
  }, [isOpen, placement, offset, content])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function syncPosition() {
      if (!triggerRef.current || !tooltipRef.current) {
        return
      }
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const next = getPlacementPosition(placement, triggerRect, tooltipRect, offset)
      const clamped = clampPosition(next, tooltipRect)
      setPosition({ top: clamped.top, left: clamped.left, side: next.side, align: next.align })
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenState(false)
      }
    }

    function onPointerDown(event) {
      if (interactive) {
        return
      }
      if (tooltipRef.current?.contains(event.target) || triggerRef.current?.contains(event.target)) {
        return
      }
      setOpenState(false)
    }

    window.addEventListener('resize', syncPosition)
    window.addEventListener('scroll', syncPosition, true)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)

    return () => {
      window.removeEventListener('resize', syncPosition)
      window.removeEventListener('scroll', syncPosition, true)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [interactive, isOpen, offset, placement])

  useEffect(() => () => clearTimers(), [])

  const anchorProps = {
    ref: triggerRef,
    className: 'nv-tooltip-anchor',
    'aria-describedby': isOpen ? tooltipId : undefined,
  }

  if (triggerModes.includes('hover')) {
    anchorProps.onMouseEnter = scheduleOpen
    anchorProps.onMouseLeave = scheduleClose
  }
  if (triggerModes.includes('focus')) {
    anchorProps.onFocus = scheduleOpen
    anchorProps.onBlur = scheduleClose
  }
  if (triggerModes.includes('click')) {
    anchorProps.onClick = () => setOpenState(!isOpen)
  }

  const tooltipClassName = ['nv-tooltip', `nv-tooltip--${position.side}`, `nv-tooltip--align-${position.align}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <span {...anchorProps}>{child}</span>
      {isOpen &&
        !disabled &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            className={tooltipClassName}
            role="tooltip"
            style={{ top: `${position.top}px`, left: `${position.left}px`, maxWidth: `${maxWidth}px` }}
            onMouseEnter={interactive ? clearTimers : undefined}
            onMouseLeave={interactive ? scheduleClose : undefined}
          >
            {typeof content === 'string' ? (
              <Text as="span" size="sm">
                {content}
              </Text>
            ) : (
              content
            )}
            {arrow && <span className="nv-tooltip-arrow" aria-hidden />}
          </div>,
          document.body,
        )}
    </>
  )
}
