import { cx, toCssSize } from '../utils'
import './Sidebar.css'

export function Sidebar({ children, width, className = '', style, ...props }) {
  return (
    <aside
      className={cx('nv-page-sidebar', className)}
      style={{
        ...(width !== undefined ? { '--nv-page-sidebar-width': toCssSize(width, '280px') } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  )
}
