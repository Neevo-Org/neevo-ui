import { cx, toCssSize } from '../utils'
import './Content.css'

export function Content({ children, padding = 24, className = '', style, ...props }) {
  return (
    <main
      className={cx('nv-page-content', className)}
      style={{ '--nv-page-content-padding': toCssSize(padding, '24px'), ...style }}
      {...props}
    >
      {children}
    </main>
  )
}
