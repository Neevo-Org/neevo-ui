import { cx } from '../utils'
import './Page.css'

export function Page({ children, className = '', style, ...props }) {
  return (
    <section className={cx('nv-page', className)} style={style} {...props}>
      {children}
    </section>
  )
}
