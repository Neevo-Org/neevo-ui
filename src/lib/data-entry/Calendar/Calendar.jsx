import { useEffect, useMemo, useState } from 'react'
import { Button } from '../Button'
import { I } from '../I'
import { Text } from '../Text'
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

function isSameDate(a, b) {
  if (!a || !b) {
    return false
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
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

export function Calendar({ value, defaultValue, onChange, className = '', ...props }) {
  const controlledValue = toSafeDate(value)
  const [internalValue, setInternalValue] = useState(() => toSafeDate(defaultValue))
  const selectedDate = controlledValue ?? internalValue
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate ?? toSafeDate(new Date()))
  const [yearPickerOpen, setYearPickerOpen] = useState(false)
  const [yearRangeStart, setYearRangeStart] = useState(() => visibleMonth.getFullYear() - 6)
  const controlledTimestamp = controlledValue?.getTime() ?? null

  useEffect(() => {
    if (controlledValue) {
      setVisibleMonth(new Date(controlledValue.getFullYear(), controlledValue.getMonth(), 1))
    }
  }, [controlledTimestamp])

  const today = useMemo(() => toSafeDate(new Date()), [])
  const monthLabel = useMemo(
    () => visibleMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    [visibleMonth],
  )
  const yearRangeLabel = useMemo(() => `${yearRangeStart} - ${yearRangeStart + 11}`, [yearRangeStart])
  const days = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth])

  function handleSelect(date) {
    if (!controlledValue) {
      setInternalValue(date)
    }
    onChange?.(date)
    setYearPickerOpen(false)
  }

  function selectYear(year) {
    setVisibleMonth((prev) => new Date(year, prev.getMonth(), 1))
    setYearPickerOpen(false)
  }

  function toggleYearPicker() {
    setYearPickerOpen((prev) => {
      const next = !prev
      if (next) {
        setYearRangeStart(visibleMonth.getFullYear() - 6)
      }
      return next
    })
  }

  function goPrevious() {
    if (yearPickerOpen) {
      setYearRangeStart((prev) => prev - 12)
      return
    }
    setVisibleMonth((prev) => addMonths(prev, -1))
  }

  function goNext() {
    if (yearPickerOpen) {
      setYearRangeStart((prev) => prev + 12)
      return
    }
    setVisibleMonth((prev) => addMonths(prev, 1))
  }

  const classes = ['nv-calendar', className].filter(Boolean).join(' ')

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
            const isActive = year === visibleMonth.getFullYear()
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
              const isSelected = isSameDate(date, selectedDate)
              const isToday = isSameDate(date, today)
              const dayClassName = [
                'nv-calendar-day',
                !isCurrentMonth && 'nv-calendar-day--outside',
                isSelected && 'nv-calendar-day--selected',
                isToday && 'nv-calendar-day--today',
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
