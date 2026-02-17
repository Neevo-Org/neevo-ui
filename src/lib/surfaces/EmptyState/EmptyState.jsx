import { Button } from '../../data-entry/Button'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './EmptyState.css'

export function EmptyState({
  icon = 'inbox',
  title = 'No data yet',
  description = 'There is nothing to show here right now.',
  actionLabel,
  onAction,
  action,
  children,
  className = '',
  ...props
}) {
  const classes = ['nv-empty-state', className].filter(Boolean).join(' ')

  return (
    <section className={classes} {...props}>
      <span className="nv-empty-state-icon" aria-hidden="true">
        <I>{icon}</I>
      </span>
      <Text as="h3" weight="semibold" className="nv-empty-state-title">
        {title}
      </Text>
      <Text tone="muted" className="nv-empty-state-description">
        {description}
      </Text>
      {action ?? (actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null)}
      {children}
    </section>
  )
}
