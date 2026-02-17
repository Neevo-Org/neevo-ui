import { Text } from '../../typography/Text'
import './Timeline.css'

export function Timeline({ children, className = '', ...props }) {
  const classes = ['nv-timeline', className].filter(Boolean).join(' ')
  return <ol className={classes} {...props}>{children}</ol>
}

export function TimelineItem({ title, description, time, className = '', children, ...props }) {
  const classes = ['nv-timeline-item', className].filter(Boolean).join(' ')
  return (
    <li className={classes} {...props}>
      <span className="nv-timeline-dot" aria-hidden="true" />
      <div className="nv-timeline-content">
        {time ? <Text as="p" size="xs" tone="muted">{time}</Text> : null}
        {title ? <Text as="p" weight="semibold">{title}</Text> : null}
        {description ? <Text as="p" size="sm" tone="muted">{description}</Text> : null}
        {children}
      </div>
    </li>
  )
}
