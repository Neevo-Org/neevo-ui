import { cx, toCssSize } from '../utils'
import './Column.css'

export function Column({
  children,
  gap = 12,
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  style,
  ...props
}) {
  return (
    <div
      className={cx('nv-column', className)}
      style={{
        '--nv-column-gap': toCssSize(gap, '12px'),
        '--nv-column-align': align,
        '--nv-column-justify': justify,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
