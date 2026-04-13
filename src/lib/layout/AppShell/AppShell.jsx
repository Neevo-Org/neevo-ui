import { Heading, Text } from '../../index.js'
import './AppShell.css'

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function AppShell({ children, className = '', ...props }) {
  return (
    <div className={joinClasses('nv-app-shell', className)} {...props}>
      {children}
    </div>
  )
}

export function AppSidebar({ header, children, footer, collapsed = false, className = '', ...props }) {
  return (
    <aside
      className={joinClasses('nv-app-sidebar', collapsed && 'is-collapsed', className)}
      {...props}
    >
      {header ? <div className="nv-app-sidebar__header">{header}</div> : null}
      <div className="nv-app-sidebar__main">{children}</div>
      {footer ? <div className="nv-app-sidebar__footer">{footer}</div> : null}
    </aside>
  )
}

export function AppSidebarBrand({
  icon,
  title,
  subtitle,
  collapsed = false,
  onClick,
  className = '',
  ...props
}) {
  const Component = onClick ? 'button' : 'div'
  return (
    <Component
      type={onClick ? 'button' : undefined}
      className={joinClasses('nv-app-sidebar-brand', collapsed && 'is-collapsed', className)}
      onClick={onClick}
      {...props}
    >
      {icon ? <span className="nv-app-sidebar-brand__icon">{icon}</span> : null}
      <span className="nv-app-sidebar-brand__copy">
        <Heading as="span" size="md">
          {title}
        </Heading>
        {subtitle ? (
          <Text as="span" size="sm" tone="muted">
            {subtitle}
          </Text>
        ) : null}
      </span>
    </Component>
  )
}

export function AppSidebarNav({ children, className = '', ...props }) {
  return (
    <div className={joinClasses('nv-app-sidebar-nav', className)} {...props}>
      <div className="nv-app-sidebar-nav__inner">{children}</div>
    </div>
  )
}

export function AppSidebarGroup({ label, children, collapsed = false, className = '', ...props }) {
  return (
    <section className={joinClasses('nv-app-sidebar-group', className)} {...props}>
      {label ? (
        <p className={joinClasses('nv-app-sidebar-group__label', collapsed && 'is-collapsed')}>{label}</p>
      ) : null}
      <div className="nv-app-sidebar-group__items">{children}</div>
    </section>
  )
}

export function AppNavItem({
  icon,
  label,
  meta,
  active = false,
  collapsed = false,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={joinClasses('nv-app-nav-item', active && 'is-active', collapsed && 'is-collapsed', className)}
      {...props}
    >
      {icon ? <span className="nv-app-nav-item__icon">{icon}</span> : null}
      <span className="nv-app-nav-item__copy">
        <span className="nv-app-nav-item__label">{label}</span>
        {meta ? <span className="nv-app-nav-item__meta">{meta}</span> : null}
      </span>
    </button>
  )
}

export function AppStage({ header, loading = false, loadingTitle, loadingSubtitle, children, className = '', ...props }) {
  return (
    <section className={joinClasses('nv-app-stage', className)} {...props}>
      {header}
      <div className="nv-app-stage__main">
        {loading ? (
          <div className="nv-app-stage-loader" role="status" aria-live="polite" aria-label="Loading content">
            <Text align="center">{loadingTitle}</Text>
            {loadingSubtitle ? (
              <Text size="sm" tone="muted" align="center">
                {loadingSubtitle}
              </Text>
            ) : null}
            <span className="nv-app-stage-loader__spinner" aria-hidden="true" />
          </div>
        ) : (
          <div className="nv-app-stage__content">{children}</div>
        )}
      </div>
    </section>
  )
}

export function AppStageHeader({
  eyebrow,
  title,
  description,
  actions,
  className = '',
  ...props
}) {
  return (
    <header className={joinClasses('nv-app-stage-header', className)} {...props}>
      <div className="nv-app-stage-header__copy">
        {eyebrow ? (
          <Text size="sm" className="nv-app-stage-header__eyebrow">
            {eyebrow}
          </Text>
        ) : null}
        <Heading as="h2" size="md">
          {title}
        </Heading>
        {description ? (
          <Text size="sm" tone="muted">
            {description}
          </Text>
        ) : null}
      </div>
      {actions ? <div className="nv-app-stage-header__actions">{actions}</div> : null}
    </header>
  )
}
