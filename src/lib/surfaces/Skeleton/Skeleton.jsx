import './Skeleton.css'

function toCssSize(value, fallback) {
  if (value === undefined || value === null) {
    return fallback
  }
  return typeof value === 'number' ? `${value}px` : value
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  animate = true,
  className = '',
  style,
  ...props
}) {
  const classes = ['nv-skeleton', `nv-skeleton--${variant}`, !animate && 'nv-skeleton--still', className]
    .filter(Boolean)
    .join(' ')

  const skeletonStyle = {
    width: toCssSize(width, variant === 'text' ? '100%' : '100%'),
    height: toCssSize(height, variant === 'text' ? '0.9rem' : undefined),
    ...style,
  }

  return <span className={classes} style={skeletonStyle} aria-hidden="true" {...props} />
}
