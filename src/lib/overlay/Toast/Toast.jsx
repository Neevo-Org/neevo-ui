import { useCallback, useContext, useRef, useState } from 'react'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import { ToastContext } from './ToastContext'
import './Toast.css'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback((toast) => {
    idRef.current += 1
    const id = toast.id ?? `toast-${idRef.current}`
    const next = { id, tone: 'default', duration: 3200, ...toast }
    setToasts((prev) => [...prev, next])
    if (next.duration > 0) {
      window.setTimeout(() => dismiss(id), next.duration)
    }
    return id
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

export function ToastViewport() {
  const context = useContext(ToastContext)
  if (!context) return null

  return (
    <div className="nv-toast-viewport">
      {context.toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => context.dismiss(toast.id)} />
      ))}
    </div>
  )
}

export function Toast({ title, description, tone = 'default', icon, onClose }) {
  const classes = ['nv-toast', `nv-toast--${tone}`].filter(Boolean).join(' ')
  const resolvedIcon = icon ?? (tone === 'success' ? 'check_circle' : tone === 'error' ? 'error' : tone === 'warning' ? 'warning' : 'info')

  return (
    <div className={classes} role="status">
      <I>{resolvedIcon}</I>
      <div className="nv-toast-body">
        {title ? <Text as="p" weight="semibold">{title}</Text> : null}
        {description ? <Text as="p" size="sm" tone="muted">{description}</Text> : null}
      </div>
      <button type="button" className="nv-toast-close" onClick={onClose} aria-label="Close toast">
        <I>close</I>
      </button>
    </div>
  )
}
