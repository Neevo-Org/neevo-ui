import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import { useBodyScrollLock } from '../shared/useBodyScrollLock'
import './Modal.css'

const ModalContext = createContext({
  stickyHeader: false,
  stickyFooter: false,
  scroll: 'body',
  titleId: undefined,
  descriptionId: undefined,
  setHasTitle: () => {},
  setHasDescription: () => {},
})

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ')

function getFocusableElements(container) {
  if (!(container instanceof HTMLElement)) {
    return []
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
}

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
  const dialogRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const [hasTitle, setHasTitle] = useState(false)
  const [hasDescription, setHasDescription] = useState(false)
  const dismissPolicy = resolveDismissPolicy({
    locked,
    closeOnBackdrop,
    closeOnEscape,
    closeOnOverlayClick,
  })
  const contextValue = useMemo(() => ({
    stickyHeader,
    stickyFooter,
    scroll,
    titleId,
    descriptionId,
    setHasTitle,
    setHasDescription,
  }), [descriptionId, scroll, stickyFooter, stickyHeader, titleId])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const dialog = dialogRef.current
    const focusable = getFocusableElements(dialog)
    const initialTarget = focusable[0] ?? dialog
    initialTarget?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape' && dismissPolicy.allowEscape) {
        onClose?.()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const dialogNode = dialogRef.current
      const nextFocusable = getFocusableElements(dialogNode)

      if (nextFocusable.length === 0) {
        event.preventDefault()
        dialogNode?.focus()
        return
      }

      const first = nextFocusable[0]
      const last = nextFocusable[nextFocusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      restoreFocusRef.current?.focus?.()
      restoreFocusRef.current = null
    }
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
      <ModalContext.Provider value={contextValue}>
        <div
          ref={dialogRef}
          className={classes}
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
        >
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
  const { stickyHeader, titleId, descriptionId, setHasTitle, setHasDescription } = useContext(ModalContext)
  const classes = ['nv-modal-header', stickyHeader && 'nv-modal-header--sticky', className].filter(Boolean).join(' ')

  useEffect(() => {
    setHasTitle(Boolean(title))
    setHasDescription(Boolean(description))

    return () => {
      setHasTitle(false)
      setHasDescription(false)
    }
  }, [description, setHasDescription, setHasTitle, title])

  return (
    <header className={classes}>
      <div className="nv-modal-title-wrap">
        {(title || description || meta) && (
          <div className="nv-modal-title-stack">
            {meta ? <div className="nv-modal-meta">{meta}</div> : null}
            {title ? (
              <Text as="h3" id={titleId} size="md" weight="semibold" className="nv-modal-title">
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" id={descriptionId} size="sm" tone="muted" className="nv-modal-description">
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
