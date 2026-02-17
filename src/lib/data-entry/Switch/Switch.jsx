import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Switch.css'

export function Switch({
  label,
  description,
  className = '',
  ...props
}) {
  const classes = ['nv-switch', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input type="checkbox" role="switch" className="nv-switch-input" {...props} />
      <span className="nv-switch-track" aria-hidden>
        <span className="nv-switch-thumb">
          <I className="nv-switch-thumb-icon nv-switch-thumb-icon--off">close</I>
          <I className="nv-switch-thumb-icon nv-switch-thumb-icon--on">check</I>
        </span>
      </span>
      <span className="nv-switch-content">
        {label && (
          <Text as="span" size="sm" weight="semibold">
            {label}
          </Text>
        )}
        {description && (
          <Text as="span" size="xs" tone="muted">
            {description}
          </Text>
        )}
      </span>
    </label>
  )
}

