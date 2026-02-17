import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Breadcrumbs.css'

export function Breadcrumbs({ items = [], separator = 'chevron_right', className = '', ...props }) {
  const classes = ['nv-breadcrumbs', className].filter(Boolean).join(' ')
  return (
    <nav aria-label="Breadcrumb" className={classes} {...props}>
      <ol className="nv-breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.key ?? `${item.label}-${index}`} className="nv-breadcrumbs-item">
              {item.href && !isLast ? <a className="nv-breadcrumbs-link" href={item.href}>{item.label}</a> : <Text as="span" tone={isLast ? 'default' : 'muted'}>{item.label}</Text>}
              {!isLast ? <I className="nv-breadcrumbs-separator">{separator}</I> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
