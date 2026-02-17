import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Modal.css'

export function Modal({
  open,
  onClose,
  children,
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) {
  useEffect(() => {
    if (!open || !closeOnEscape) {
      return
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeOnEscape, onClose, open])

  useEffect(() => {
    if (!open) {
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) {
    return null
  }

  const classes = ['nv-modal', className].filter(Boolean).join(' ')

  return createPortal(
    <div className="nv-overlay" role="presentation" onClick={closeOnOverlayClick ? () => onClose?.() : undefined}>
      <div className={classes} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function ModalHeader({ title, onClose, children, className = '' }) {
  const classes = ['nv-modal-header', className].filter(Boolean).join(' ')
  return (
    <header className={classes}>
      <div className="nv-modal-title-wrap">
        {title && (
          <Text as="h3" size="md" weight="semibold">
            {title}
          </Text>
        )}
        {children}
      </div>
      {onClose && (
        <button type="button" className="nv-modal-close" onClick={onClose} aria-label="Close modal">
          <I>close</I>
        </button>
      )}
    </header>
  )
}

export function ModalBody({ children, className = '' }) {
  const classes = ['nv-modal-body', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

export function ModalFooter({ children, className = '' }) {
  const classes = ['nv-modal-footer', className].filter(Boolean).join(' ')
  return <footer className={classes}>{children}</footer>
}

