import { Button } from '../../data-entry/Button'
import { I } from '../../typography/I'
import './Pagination.css'

function clamp(page, totalPages) {
  return Math.min(Math.max(page, 1), totalPages)
}

export function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  className = '',
  ...props
}) {
  const classes = ['nv-pagination', `nv-pagination--${size}`, className].filter(Boolean).join(' ')
  const current = clamp(page, totalPages)

  const pages = []
  const start = Math.max(1, current - siblingCount)
  const end = Math.min(totalPages, current + siblingCount)
  for (let p = start; p <= end; p += 1) pages.push(p)

  return (
    <nav className={classes} aria-label="Pagination" {...props}>
      <Button variant="secondary" size={size} disabled={current <= 1} onClick={() => onPageChange?.(current - 1)}>
        <I>chevron_left</I>
        Prev
      </Button>
      {start > 1 ? <Button variant="secondary" size={size} onClick={() => onPageChange?.(1)}>1</Button> : null}
      {start > 2 ? <span className="nv-pagination-ellipsis">...</span> : null}
      {pages.map((p) => (
        <Button key={p} size={size} variant={p === current ? 'primary' : 'secondary'} onClick={() => onPageChange?.(p)}>
          {p}
        </Button>
      ))}
      {end < totalPages - 1 ? <span className="nv-pagination-ellipsis">...</span> : null}
      {end < totalPages ? <Button variant="secondary" size={size} onClick={() => onPageChange?.(totalPages)}>{totalPages}</Button> : null}
      <Button variant="secondary" size={size} disabled={current >= totalPages} onClick={() => onPageChange?.(current + 1)}>
        Next
        <I>chevron_right</I>
      </Button>
    </nav>
  )
}
