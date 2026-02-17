import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Drawer.css'

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
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

  const classes = ['nv-drawer', `nv-drawer--${side}`, className].filter(Boolean).join(' ')

  return createPortal(
    <div className="nv-overlay" role="presentation" onClick={closeOnOverlayClick ? () => onClose?.() : undefined}>
      <aside className={classes} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        {children}
      </aside>
    </div>,
    document.body,
  )
}

export function DrawerHeader({ title, onClose, children, className = '' }) {
  const classes = ['nv-drawer-header', className].filter(Boolean).join(' ')
  return (
    <header className={classes}>
      <div className="nv-drawer-title-wrap">
        {title && (
          <Text as="h3" size="md" weight="semibold">
            {title}
          </Text>
        )}
        {children}
      </div>
      {onClose && (
        <button type="button" className="nv-drawer-close" onClick={onClose} aria-label="Close drawer">
          <I>close</I>
        </button>
      )}
    </header>
  )
}

export function DrawerBody({ children, className = '' }) {
  const classes = ['nv-drawer-body', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

export function DrawerFooter({ children, className = '' }) {
  const classes = ['nv-drawer-footer', className].filter(Boolean).join(' ')
  return <footer className={classes}>{children}</footer>
}

