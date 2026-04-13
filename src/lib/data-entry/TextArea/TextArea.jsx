import { Text } from '../../typography/Text'
import './TextArea.css'

export function TextArea({
  label,
  hint,
  error,
  variant = 'default',
  shell = false,
  className = '',
  textAreaClassName = '',
  rows = 4,
  ...props
}) {
  const wrapperClass = ['nv-field', variant !== 'default' && `nv-field--${variant}`, className].filter(Boolean).join(' ')
  const controlClass = [
    'nv-textarea-control',
    variant !== 'default' && `nv-textarea-control--${variant}`,
    shell && 'nv-textarea-control--shell',
    error && 'nv-textarea-control--error',
    textAreaClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={wrapperClass}>
      {label && (
        <Text as="span" size="sm" weight="semibold" className="nv-field-label">
          {label}
        </Text>
      )}
      <span className={controlClass}>
        <textarea className="nv-textarea-element" rows={rows} {...props} />
      </span>
      {(hint || error) && (
        <Text as="span" size="xs" tone={error ? 'default' : 'muted'} className={error ? 'nv-field-error' : ''}>
          {error || hint}
        </Text>
      )}
    </label>
  )
}

