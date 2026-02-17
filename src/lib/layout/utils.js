export function cx(...values) {
  return values.filter(Boolean).join(' ')
}

export function toCssSize(value, fallback) {
  if (value === undefined || value === null) {
    return fallback
  }
  return typeof value === 'number' ? `${value}px` : value
}
