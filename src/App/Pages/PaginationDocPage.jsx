import { useState } from 'react'
import { Pagination, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function PaginationDocPage() {
  const [page, setPage] = useState(4)

  return (
    <>
      <Text tone="muted">Pagination helps users navigate long result sets one page at a time.</Text>
      <Section title="Examples">
        <Example
          title="Paginated Navigation"
          code={`<Pagination page={page} totalPages={12} onPageChange={setPage} />`}
        >
          <Pagination page={page} totalPages={12} onPageChange={setPage} />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'page', type: 'number', defaultValue: '1', description: 'Current page.' },
          { prop: 'totalPages', type: 'number', defaultValue: '1', description: 'Total number of pages.' },
          { prop: 'onPageChange', type: '(page) => void', defaultValue: 'undefined', description: 'Called when page changes.' },
          { prop: 'siblingCount', type: 'number', defaultValue: '1', description: 'Visible page buttons around current page.' },
        ]} />
      </Section>
    </>
  )
}
