import './Progress.css'

function clampPercent(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.min(100, Math.max(0, n))
}

export function Progress({ value = 0, className = '', ...props }) {
  const percent = clampPercent(value)
  const classes = ['nv-progress', className].filter(Boolean).join(' ')
  return (
    <div className={classes} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} {...props}>
      <span className="nv-progress-bar" style={{ width: `${percent}%` }} />
    </div>
  )
}

export function CircularProgress({ value = 0, size = 48, stroke = 5, className = '', showValue = false, ...props }) {
  const percent = clampPercent(value)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  const classes = ['nv-circular-progress', className].filter(Boolean).join(' ')

  return (
    <div className={classes} style={{ width: size, height: size }} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="nv-circular-progress-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="nv-circular-progress-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showValue ? <span className="nv-circular-progress-label">{Math.round(percent)}%</span> : null}
    </div>
  )
}
