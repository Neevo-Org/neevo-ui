import { cx, toCssSize } from '../utils'
import './Grid.css'

export function Grid({ children, columns = 12, min = 220, gap = 16, className = '', style, ...props }) {
  return (
    <div
      className={cx('nv-grid', className)}
      style={{
        '--nv-grid-columns': columns,
        '--nv-grid-gap': toCssSize(gap, '16px'),
        '--nv-grid-min': toCssSize(min, '220px'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
