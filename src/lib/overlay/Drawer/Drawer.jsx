import { createContext, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import { useBodyScrollLock } from '../shared/useBodyScrollLock'
import './Drawer.css'

const DrawerContext = createContext({
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

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  size = 'md',
  surface = 'default',
  stickyHeader = false,
  stickyFooter = false,
  scroll = 'body',
  className = '',
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
    'nv-drawer',
    `nv-drawer--${side}`,
    `nv-drawer--${size}`,
    `nv-drawer--surface-${surface}`,
    `nv-drawer--scroll-${scroll}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return createPortal(
    <div
      className="nv-overlay nv-overlay--drawer"
      role="presentation"
      onClick={dismissPolicy.allowBackdrop ? () => onClose?.() : undefined}
    >
      <DrawerContext.Provider value={{ stickyHeader, stickyFooter, scroll }}>
        <aside className={classes} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
          {children}
        </aside>
      </DrawerContext.Provider>
    </div>,
    document.body,
  )
}

export function DrawerHeader({
  title,
  description,
  meta,
  onClose,
  children,
  className = '',
}) {
  const { stickyHeader } = useContext(DrawerContext)
  const classes = ['nv-drawer-header', stickyHeader && 'nv-drawer-header--sticky', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="nv-drawer-title-wrap">
        {(title || description || meta) && (
          <div className="nv-drawer-title-stack">
            {meta ? <div className="nv-drawer-meta">{meta}</div> : null}
            {title ? (
              <Text as="h3" size="md" weight="semibold" className="nv-drawer-title">
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" size="sm" tone="muted" className="nv-drawer-description">
                {description}
              </Text>
            ) : null}
          </div>
        )}
        {children ? <div className="nv-drawer-header-slot">{children}</div> : null}
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
  const { scroll } = useContext(DrawerContext)
  const classes = ['nv-drawer-body', scroll === 'body' && 'nv-drawer-body--scroll', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}

export function DrawerSection({ title, description, aside, children, className = '' }) {
  const classes = ['nv-drawer-section', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      {(title || description || aside) && (
        <div className="nv-drawer-section__head">
          <div className="nv-drawer-section__copy">
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
          {aside ? <div className="nv-drawer-section__aside">{aside}</div> : null}
        </div>
      )}
      <div className="nv-drawer-section__body">{children}</div>
    </section>
  )
}

export function DrawerFooter({ children, className = '' }) {
  const { stickyFooter } = useContext(DrawerContext)
  const classes = ['nv-drawer-footer', stickyFooter && 'nv-drawer-footer--sticky', className].filter(Boolean).join(' ')
  return <footer className={classes}>{children}</footer>
}
