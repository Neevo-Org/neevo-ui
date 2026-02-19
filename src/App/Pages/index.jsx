/* eslint-disable react-refresh/only-export-components */
import { MDX_PAGE_LIST, renderMdxPage } from '../../../docs/registry'

export const PAGE_LIST = MDX_PAGE_LIST

export function getPageFromHash() {
  const raw = window.location.hash.replace('#/', '').trim().toLowerCase()
  return PAGE_LIST.some((p) => p.id === raw) ? raw : PAGE_LIST[0].id
}

export function renderPage(pageId) {
  return renderMdxPage(pageId) ?? renderMdxPage(PAGE_LIST[0].id)
}
