import { createContext, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import { useBodyScrollLock } from '../shared/useBodyScrollLock'
import './Modal.css'

const ModalContext = createContext({
  stickyHeader: false,
  stickyFooter: false,
  scroll: 'body',
})

function resolveDismissPolicy({ locked, closeOnBackdrop, closeOnEscape, closeOnOverlayClick }) {
  if (locked) {
    return {
      allowBackdrop: false,
      allowEscape: false,
    }
  }

  return {
    allowBackdrop: closeOnBackdrop ?? closeOnOverlayClick ?? true,
    allowEscape: closeOnEscape ?? true,
  }
}

export function Modal({
  open,
  onClose,
  children,
  className = '',
  size = 'md',
  surface = 'default',
  stickyHeader = false,
  stickyFooter = false,
  scroll = 'body',
  locked = false,
  closeOnBackdrop,
  closeOnEscape,
  closeOnOverlayClick,
}) {
  const dismissPolicy = resolveDismissPolicy({
    locked,
    closeOnBackdrop,
    closeOnEscape,
    closeOnOverlayClick,
  })

  useEffect(() => {
    if (!open || !dismissPolicy.allowEscape) {
      return undefined
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [dismissPolicy.allowEscape, onClose, open])

  useBodyScrollLock(open)

  if (!open) {
    return null
  }

  const classes = [
    'nv-modal',
    `nv-modal--${size}`,
    `nv-modal--surface-${surface}`,
    `nv-modal--scroll-${scroll}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return createPortal(
    <div
      className="nv-overlay nv-overlay--modal"
      role="presentation"
      onClick={dismissPolicy.allowBackdrop ? () => onClose?.() : undefined}
    >
      <ModalContext.Provider value={{ stickyHeader, stickyFooter, scroll }}>
        <div className={classes} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </ModalContext.Provider>
    </div>,
    document.body,
  )
}

export function ModalHeader({
  title,
  description,
  meta,
  onClose,
  children,
  className = '',
}) {
  const { stickyHeader } = useContext(ModalContext)
  const classes = ['nv-modal-header', stickyHeader && 'nv-modal-header--sticky', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="nv-modal-title-wrap">
        {(title || description || meta) && (
          <div className="nv-modal-title-stack">
            {meta ? <div className="nv-modal-meta">{meta}</div> : null}
            {title ? (
              <Text as="h3" size="md" weight="semibold" className="nv-modal-title">
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" size="sm" tone="muted" className="nv-modal-description">
                {description}
              </Text>
            ) : null}
          </div>
        )}
        {children ? <div className="nv-modal-header-slot">{children}</div> : null}
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
  const { scroll } = useContext(ModalContext)
  const classes = ['nv-modal-body', scroll === 'body' && 'nv-modal-body--scroll', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

export function ModalSection({ title, description, aside, children, className = '' }) {
  const classes = ['nv-modal-section', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      {(title || description || aside) && (
        <div className="nv-modal-section__head">
          <div className="nv-modal-section__copy">
            {title ? (
              <Text as="h4" size="sm" weight="semibold">
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" size="xs" tone="muted">
                {description}
              </Text>
            ) : null}
          </div>
          {aside ? <div className="nv-modal-section__aside">{aside}</div> : null}
        </div>
      )}
      <div className="nv-modal-section__body">{children}</div>
    </section>
  )
}

export function ModalFooter({ children, className = '' }) {
  const { stickyFooter } = useContext(ModalContext)
  const classes = ['nv-modal-footer', stickyFooter && 'nv-modal-footer--sticky', className].filter(Boolean).join(' ')
  return <footer className={classes}>{children}</footer>
}
