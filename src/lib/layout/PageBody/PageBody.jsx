import { cx, toCssSize } from '../utils'
import './PageBody.css'

export function PageBody({ children, sidebarWidth = 280, gap = 0, className = '', style, ...props }) {
  return (
    <div
      className={cx('nv-page-body', className)}
      style={{
        '--nv-page-sidebar-width': toCssSize(sidebarWidth, '280px'),
        '--nv-page-body-gap': toCssSize(gap, '0px'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
