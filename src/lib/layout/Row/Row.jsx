import { cx, toCssSize } from '../utils'
import './Row.css'

export function Row({
  children,
  gap = 12,
  align = 'center',
  justify = 'flex-start',
  wrap = true,
  className = '',
  style,
  ...props
}) {
  return (
    <div
      className={cx('nv-row', className)}
      style={{
        '--nv-row-gap': toCssSize(gap, '12px'),
        '--nv-row-align': align,
        '--nv-row-justify': justify,
        '--nv-row-wrap': wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
