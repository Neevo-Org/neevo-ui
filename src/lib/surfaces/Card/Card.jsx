import './Card.css'
import { Text } from '../../typography/Text'

function buildClassName(baseClass, className = '') {
  return [baseClass, className].filter(Boolean).join(' ')
}

function withTextFallback(children, textProps) {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text as="span" {...textProps}>
        {children}
      </Text>
    )
  }
  return children
}

export function Card({ children, className = '', elevated = true, ...props }) {
  const classes = ['nv-card', !elevated && 'nv-card--flat', className].filter(Boolean).join(' ')
  return (
    <article className={classes} {...props}>
      {children}
    </article>
  )
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <header className={buildClassName('nv-card-header', className)} {...props}>
      {withTextFallback(children, { weight: 'semibold' })}
    </header>
  )
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={buildClassName('nv-card-body', className)} {...props}>
      {withTextFallback(children, { tone: 'muted' })}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <footer className={buildClassName('nv-card-footer', className)} {...props}>
      {withTextFallback(children, { tone: 'muted', size: 'sm' })}
    </footer>
  )
}

