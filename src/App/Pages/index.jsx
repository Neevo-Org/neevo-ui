import { ButtonDocPage } from './ButtonDocPage'
import { InputDocPage } from './InputDocPage'
import { TextAreaDocPage } from './TextAreaDocPage'
import { CheckboxDocPage } from './CheckboxDocPage'
import { SwitchDocPage } from './SwitchDocPage'
import { RadioGroupDocPage } from './RadioGroupDocPage'
import { SelectDocPage } from './SelectDocPage'
import { CalendarDocPage } from './CalendarDocPage'
import { TableDocPage } from './TableDocPage'
import { TooltipDocPage } from './TooltipDocPage'
import { ModalDocPage } from './ModalDocPage'
import { DrawerDocPage } from './DrawerDocPage'
import { LayoutDocPage } from './LayoutDocPage'
import { CardDocPage } from './CardDocPage'
import { TextDocPage } from './TextDocPage'
import { ThemeProviderDocPage } from './ThemeProviderDocPage'
import { IconDocPage } from './IconDocPage'
import { CodeBlockDocPage } from './CodeBlockDocPage'
import { SkeletonDocPage } from './SkeletonDocPage'
import { AccordionDocPage } from './AccordionDocPage'
import { EmptyStateDocPage } from './EmptyStateDocPage'
import { TagInputDocPage } from './TagInputDocPage'
import { TabsDocPage } from './TabsDocPage'
import { PaginationDocPage } from './PaginationDocPage'
import { TimelineDocPage } from './TimelineDocPage'
import { ProgressDocPage } from './ProgressDocPage'
import { PopoverDocPage } from './PopoverDocPage'
import { ToastDocPage } from './ToastDocPage'
import { BreadcrumbsDocPage } from './BreadcrumbsDocPage'
import { StepperDocPage } from './StepperDocPage'
import { MenuDocPage } from './MenuDocPage'
import { CommandPaletteDocPage } from './CommandPaletteDocPage'
import { AvatarDocPage } from './AvatarDocPage'
import { BadgeDocPage } from './BadgeDocPage'
import { DividerDocPage } from './DividerDocPage'
import { SliderDocPage } from './SliderDocPage'

export const PAGE_LIST = [
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'TextArea' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'switch', label: 'Switch' },
  { id: 'radiogroup', label: 'RadioGroup' },
  { id: 'select', label: 'Select' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'table', label: 'Table' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'modal', label: 'Modal' },
  { id: 'drawer', label: 'Drawer' },
  { id: 'layout', label: 'Layout System' },
  { id: 'card', label: 'Card' },
  { id: 'text', label: 'Text / Heading' },
  { id: 'themeprovider', label: 'ThemeProvider' },
  { id: 'icon', label: 'I (Icons)' },
  { id: 'codeblock', label: 'CodeBlock' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'emptystate', label: 'EmptyState' },
  { id: 'taginput', label: 'TagInput' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'progress', label: 'Progress' },
  { id: 'popover', label: 'Popover' },
  { id: 'toast', label: 'Toast' },
  { id: 'breadcrumbs', label: 'Breadcrumbs' },
  { id: 'stepper', label: 'Stepper' },
  { id: 'menu', label: 'Menu / DropdownMenu' },
  { id: 'commandpalette', label: 'CommandPalette' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'divider', label: 'Divider' },
  { id: 'slider', label: 'Slider / RangeSlider' },
]

export function getPageFromHash() {
  const raw = window.location.hash.replace('#/', '').trim().toLowerCase()
  return PAGE_LIST.some((p) => p.id === raw) ? raw : PAGE_LIST[0].id
}

const PAGE_COMPONENTS = {
  button: ButtonDocPage,
  input: InputDocPage,
  textarea: TextAreaDocPage,
  checkbox: CheckboxDocPage,
  switch: SwitchDocPage,
  radiogroup: RadioGroupDocPage,
  select: SelectDocPage,
  calendar: CalendarDocPage,
  table: TableDocPage,
  tooltip: TooltipDocPage,
  modal: ModalDocPage,
  drawer: DrawerDocPage,
  layout: LayoutDocPage,
  card: CardDocPage,
  text: TextDocPage,
  themeprovider: ThemeProviderDocPage,
  icon: IconDocPage,
  codeblock: CodeBlockDocPage,
  skeleton: SkeletonDocPage,
  accordion: AccordionDocPage,
  emptystate: EmptyStateDocPage,
  taginput: TagInputDocPage,
  tabs: TabsDocPage,
  pagination: PaginationDocPage,
  timeline: TimelineDocPage,
  progress: ProgressDocPage,
  popover: PopoverDocPage,
  toast: ToastDocPage,
  breadcrumbs: BreadcrumbsDocPage,
  stepper: StepperDocPage,
  menu: MenuDocPage,
  commandpalette: CommandPaletteDocPage,
  avatar: AvatarDocPage,
  badge: BadgeDocPage,
  divider: DividerDocPage,
  slider: SliderDocPage,
}

export function renderPage(pageId) {
  const PageComponent = PAGE_COMPONENTS[pageId] ?? ButtonDocPage
  return <PageComponent />
}
