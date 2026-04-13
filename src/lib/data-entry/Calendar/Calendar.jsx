import { useMemo, useState } from 'react'
import { Button } from '../Button'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Calendar.css'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toSafeDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate())
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
    }
  }

  return null
}

function normalizeRange(value) {
  if (!value || typeof value !== 'object') {
    return { start: null, end: null }
  }

  const start = toSafeDate(value.start)
  const end = toSafeDate(value.end)

  if (start && end && start.getTime() > end.getTime()) {
    return { start: end, end: start }
  }

  return { start, end }
}

function isSameDate(a, b) {
  if (!a || !b) {
    return false
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isBetweenDates(date, start, end) {
  if (!date || !start || !end) {
    return false
  }
  const value = date.getTime()
  return value > start.getTime() && value < end.getTime()
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function buildCalendarDays(monthDate) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const startOffset = firstDay.getDay()
  const startDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + index)
    return {
      date,
      isCurrentMonth: date.getMonth() === monthDate.getMonth(),
    }
  })
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  className = '',
  selectionMode = 'single',
  surface = 'default',
  size = 'md',
  ...props
}) {
  const isControlled = value !== undefined
  const controlledSingleValue = selectionMode === 'single' ? toSafeDate(value) : null
  const controlledRangeValue = selectionMode === 'range' ? normalizeRange(value) : { start: null, end: null }
  const controlledAnchorDate = selectionMode === 'range'
    ? controlledRangeValue.start ?? controlledRangeValue.end
    : controlledSingleValue
  const controlledMonth = controlledAnchorDate
    ? new Date(controlledAnchorDate.getFullYear(), controlledAnchorDate.getMonth(), 1)
    : null
  const controlledMonthKey = controlledMonth ? `${controlledMonth.getFullYear()}-${controlledMonth.getMonth()}` : null

  const [internalValue, setInternalValue] = useState(() => (
    selectionMode === 'range' ? normalizeRange(defaultValue) : toSafeDate(defaultValue)
  ))

  const selectedDate = selectionMode === 'single'
    ? (isControlled ? controlledSingleValue : internalValue)
    : null
  const selectedRange = selectionMode === 'range'
    ? (isControlled ? controlledRangeValue : internalValue)
    : { start: null, end: null }

  const anchorDate = selectionMode === 'range'
    ? selectedRange.start ?? selectedRange.end
    : selectedDate

  const [monthViewState, setMonthViewState] = useState(() => ({
    month: controlledMonth ?? anchorDate ?? toSafeDate(new Date()),
    manual: false,
    anchorControlledKey: controlledMonthKey,
  }))

  const [yearPickerOpen, setYearPickerOpen] = useState(false)
  const [yearRangeStart, setYearRangeStart] = useState(() => monthViewState.month.getFullYear() - 6)
  const isManualViewActive = monthViewState.manual && monthViewState.anchorControlledKey === controlledMonthKey
  const displayMonth = controlledMonth && !isManualViewActive ? controlledMonth : monthViewState.month

  const today = useMemo(() => toSafeDate(new Date()), [])
  const monthLabel = useMemo(
    () => displayMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    [displayMonth],
  )
  const yearRangeLabel = useMemo(() => `${yearRangeStart} - ${yearRangeStart + 11}`, [yearRangeStart])
  const days = useMemo(() => buildCalendarDays(displayMonth), [displayMonth])

  function updateDisplayedMonth(date) {
    setMonthViewState({
      month: new Date(date.getFullYear(), date.getMonth(), 1),
      manual: false,
      anchorControlledKey: controlledMonthKey,
    })
    setYearPickerOpen(false)
  }

  function handleSelect(date) {
    if (selectionMode === 'range') {
      const currentRange = selectedRange
      const nextRange =
        !currentRange.start || (currentRange.start && currentRange.end)
          ? { start: date, end: null }
          : date.getTime() < currentRange.start.getTime()
            ? { start: date, end: currentRange.start }
            : { start: currentRange.start, end: date }

      if (!isControlled) {
        setInternalValue(nextRange)
      }
      onChange?.(nextRange)
      updateDisplayedMonth(date)
      return
    }

    if (!isControlled) {
      setInternalValue(date)
    }
    onChange?.(date)
    updateDisplayedMonth(date)
  }

  function selectYear(year) {
    setMonthViewState({
      month: new Date(year, displayMonth.getMonth(), 1),
      manual: true,
      anchorControlledKey: controlledMonthKey,
    })
    setYearPickerOpen(false)
  }

  function toggleYearPicker() {
    setYearPickerOpen((prev) => {
      const next = !prev
      if (next) {
        setYearRangeStart(displayMonth.getFullYear() - 6)
      }
      return next
    })
  }

  function goPrevious() {
    if (yearPickerOpen) {
      setYearRangeStart((prev) => prev - 12)
      return
    }
    setMonthViewState({
      month: addMonths(displayMonth, -1),
      manual: true,
      anchorControlledKey: controlledMonthKey,
    })
  }

  function goNext() {
    if (yearPickerOpen) {
      setYearRangeStart((prev) => prev + 12)
      return
    }
    setMonthViewState({
      month: addMonths(displayMonth, 1),
      manual: true,
      anchorControlledKey: controlledMonthKey,
    })
  }

  const classes = ['nv-calendar', `nv-calendar--${size}`, `nv-calendar--surface-${surface}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      <div className="nv-calendar-header">
        <Button
          variant="secondary"
          className="nv-calendar-nav"
          onClick={goPrevious}
          aria-label={yearPickerOpen ? 'Previous year range' : 'Previous month'}
        >
          <I>chevron_left</I>
        </Button>
        <Button
          variant="secondary"
          className="nv-calendar-label-button"
          onClick={toggleYearPicker}
          aria-label="Choose year"
        >
          <Text as="span" size="sm" weight="semibold" className="nv-calendar-label">
            {yearPickerOpen ? yearRangeLabel : monthLabel}
          </Text>
        </Button>
        <Button
          variant="secondary"
          className="nv-calendar-nav"
          onClick={goNext}
          aria-label={yearPickerOpen ? 'Next year range' : 'Next month'}
        >
          <I>chevron_right</I>
        </Button>
      </div>

      {yearPickerOpen ? (
        <div className="nv-calendar-year-grid">
          {Array.from({ length: 12 }, (_, index) => yearRangeStart + index).map((year) => {
            const isActive = year === displayMonth.getFullYear()
            const yearClassName = ['nv-calendar-year', isActive && 'nv-calendar-year--active']
              .filter(Boolean)
              .join(' ')

            return (
              <Button key={year} variant="secondary" className={yearClassName} onClick={() => selectYear(year)}>
                <Text as="span" size="sm">
                  {year}
                </Text>
              </Button>
            )
          })}
        </div>
      ) : (
        <>
          <div className="nv-calendar-weekdays">
            {WEEKDAY_LABELS.map((label) => (
              <Text key={label} as="span" size="xs" tone="muted" className="nv-calendar-weekday">
                {label}
              </Text>
            ))}
          </div>

          <div className="nv-calendar-grid">
            {days.map(({ date, isCurrentMonth }) => {
              const isSelected = selectionMode === 'single' && isSameDate(date, selectedDate)
              const isRangeStart = selectionMode === 'range' && isSameDate(date, selectedRange.start)
              const isRangeEnd = selectionMode === 'range' && isSameDate(date, selectedRange.end)
              const isInRange = selectionMode === 'range' && isBetweenDates(date, selectedRange.start, selectedRange.end)
              const isToday = isSameDate(date, today)
              const dayClassName = [
                'nv-calendar-day',
                !isCurrentMonth && 'nv-calendar-day--outside',
                isSelected && 'nv-calendar-day--selected',
                isToday && 'nv-calendar-day--today',
                isRangeStart && 'nv-calendar-day--range-start',
                isRangeEnd && 'nv-calendar-day--range-end',
                isInRange && 'nv-calendar-day--in-range',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <Button
                  key={date.toISOString()}
                  variant="secondary"
                  className={dayClassName}
                  onClick={() => handleSelect(date)}
                >
                  <Text as="span" size="sm">
                    {date.getDate()}
                  </Text>
                </Button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
