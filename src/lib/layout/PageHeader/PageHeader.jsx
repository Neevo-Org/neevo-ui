import { cx, toCssSize } from '../utils'
import './PageHeader.css'

export function PageHeader({
  children,
  sticky = false,
  bordered = true,
  padding = 16,
  className = '',
  style,
  ...props
}) {
  return (
    <header
      className={cx('nv-page-header', sticky && 'nv-page-header--sticky', bordered && 'nv-page-header--bordered', className)}
      style={{ '--nv-page-header-padding': toCssSize(padding, '16px'), ...style }}
      {...props}
    >
      {children}
    </header>
  )
}
