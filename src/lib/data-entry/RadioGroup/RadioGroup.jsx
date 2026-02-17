import { Children, cloneElement, isValidElement } from 'react'
import { Text } from '../../typography/Text'
import './RadioGroup.css'

export function RadioGroup({
  label,
  description,
  value,
  onChange,
  name,
  children,
  className = '',
  ...props
}) {
  const classes = ['nv-radio-group', className].filter(Boolean).join(' ')

  return (
    <fieldset className={classes} {...props}>
      {(label || description) && (
        <legend className="nv-radio-legend">
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
        </legend>
      )}
      <div className="nv-radio-options">
        {Children.map(children, (child) => {
          if (!isValidElement(child) || child.type !== RadioOption) {
            return child
          }

          return cloneElement(child, {
            name: child.props.name ?? name,
            checked: value === child.props.value,
            onChange: () => onChange?.(child.props.value),
          })
        })}
      </div>
    </fieldset>
  )
}

export function RadioOption({ label, description, className = '', ...props }) {
  const classes = ['nv-radio', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input type="radio" className="nv-radio-input" {...props} />
      <span className="nv-radio-dot" aria-hidden>
        <span className="nv-radio-dot-inner" />
      </span>
      <span className="nv-radio-content">
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

