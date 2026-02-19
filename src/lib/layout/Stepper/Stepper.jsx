import './Stepper.css'

export function Stepper({ steps = [], current = 0, className = '', ...props }) {
  const classes = ['nv-stepper', className].filter(Boolean).join(' ')

  return (
    <ol className={classes} {...props}>
      {steps.map((step, index) => {
        const label = step?.label ?? step?.title ?? `Step ${index + 1}`
        const state = index < current ? 'done' : index === current ? 'active' : 'todo'
        const itemClasses = ['nv-stepper-item', `nv-stepper-item--${state}`].join(' ')
        return (
          <li key={step?.key ?? `${label}-${index}`} className={itemClasses}>
            <span className="nv-stepper-dot">{index + 1}</span>
            <span className="nv-stepper-label">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
