import { cx, toCssSize } from '../utils'
import './Container.css'

export function Container({ children, width = 1200, padding = 16, className = '', style, ...props }) {
  return (
    <div
      className={cx('nv-container', className)}
      style={{
        '--nv-container-width': toCssSize(width, '1200px'),
        '--nv-container-padding': toCssSize(padding, '16px'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
