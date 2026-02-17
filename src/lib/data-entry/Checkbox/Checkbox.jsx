import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Checkbox.css'

export function Checkbox({ label, description, className = '', ...props }) {
  const classes = ['nv-checkbox', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input type="checkbox" className="nv-checkbox-input" {...props} />
      <span className="nv-checkbox-box" aria-hidden>
        <I className="nv-checkbox-check">check</I>
      </span>
      <span className="nv-checkbox-content">
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

