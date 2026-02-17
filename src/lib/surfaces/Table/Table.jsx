import { Children, createContext, isValidElement, useContext, useMemo, useState } from 'react'
import { I } from '../../typography/I'
import { Text } from '../../typography/Text'
import './Table.css'

const TableSortContext = createContext(null)

function withTextFallback(children, props) {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text as="span" {...props}>
        {children}
      </Text>
    )
  }
  return children
}

function getDefaultSortValue(value) {
  if (value === undefined || value === null) {
    return ''
  }
  if (typeof value === 'number') {
    return value
  }
  return String(value).toLowerCase()
}

export function Table({
  children,
  className = '',
  compact = false,
  sort,
  defaultSort = { key: null, direction: 'asc' },
  onSortChange,
  ...props
}) {
  const isControlled = Boolean(sort)
  const [internalSort, setInternalSort] = useState(defaultSort)
  const activeSort = isControlled ? sort : internalSort

  function setSort(next) {
    if (!isControlled) {
      setInternalSort(next)
    }
    onSortChange?.(next)
  }

  function toggleSort(sortKey) {
    if (!sortKey) {
      return
    }

    const isSameKey = activeSort?.key === sortKey
    const nextDirection = isSameKey && activeSort.direction === 'asc' ? 'desc' : 'asc'
    setSort({ key: sortKey, direction: nextDirection })
  }

  const contextValue = { activeSort: activeSort ?? { key: null, direction: 'asc' }, toggleSort }

  const classes = ['nv-table-wrap', compact && 'nv-table-wrap--compact', className].filter(Boolean).join(' ')

  return (
    <TableSortContext.Provider value={contextValue}>
      <div className={classes}>
        <table className="nv-table" {...props}>
          {children}
        </table>
      </div>
    </TableSortContext.Provider>
  )
}

export function TableHead({ children, className = '', ...props }) {
  const classes = ['nv-table-head', className].filter(Boolean).join(' ')
  return (
    <thead className={classes} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '', ...props }) {
  const classes = ['nv-table-body', className].filter(Boolean).join(' ')
  const sortContext = useContext(TableSortContext)

  const sortedChildren = useMemo(() => {
    if (!sortContext?.activeSort?.key) {
      return children
    }

    const rows = Children.toArray(children)
    const { key, direction } = sortContext.activeSort

    const prepared = rows.map((row, index) => {
      if (!isValidElement(row)) {
        return { row, index, value: '' }
      }

      const rowCells = Children.toArray(row.props.children)
      const matchedCell = rowCells.find(
        (cell) => isValidElement(cell) && (cell.props.sortKey === key || cell.props.columnKey === key),
      )

      const rawValue =
        matchedCell?.props.sortValue ??
        matchedCell?.props.children ??
        ''

      return {
        row,
        index,
        value: getDefaultSortValue(rawValue),
      }
    })

    prepared.sort((a, b) => {
      if (a.value === b.value) {
        return a.index - b.index
      }
      const comparison = a.value > b.value ? 1 : -1
      return direction === 'asc' ? comparison : -comparison
    })

    return prepared.map((item) => item.row)
  }, [children, sortContext?.activeSort])

  return (
    <tbody className={classes} {...props}>
      {sortedChildren}
    </tbody>
  )
}

export function TableRow({ children, className = '', ...props }) {
  const classes = ['nv-table-row', className].filter(Boolean).join(' ')
  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  )
}

export function TableCell({
  children,
  as: Tag = 'td',
  className = '',
  align = 'left',
  numeric = false,
  sortable = false,
  sortDirection,
  sortKey,
  sortValue,
  columnKey,
  onSort,
  ...props
}) {
  const sortContext = useContext(TableSortContext)
  const isHeader = Tag === 'th'
  const isActive = isHeader && sortContext?.activeSort?.key === sortKey
  const resolvedDirection = sortDirection ?? (isActive ? sortContext?.activeSort?.direction : 'none')

  function handleSort() {
    onSort?.()
    if (!onSort) {
      sortContext?.toggleSort(sortKey)
    }
  }

  const classes = [
    'nv-table-cell',
    `nv-table-cell--${align}`,
    numeric && 'nv-table-cell--numeric',
    sortable && 'nv-table-cell--sortable',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const textProps = isHeader ? { size: 'sm', weight: 'semibold' } : { size: 'sm' }
  const ariaSort = isHeader && resolvedDirection !== 'none' ? (resolvedDirection === 'asc' ? 'ascending' : 'descending') : undefined

  return (
    <Tag className={classes} aria-sort={ariaSort} {...props}>
      {sortable ? (
        <button type="button" className="nv-table-sort-trigger" onClick={handleSort}>
          <span className="nv-table-sort-content">
            <I
              key={resolvedDirection}
              className={
                resolvedDirection === 'none'
                  ? 'nv-table-sort-icon nv-table-sort-icon--hint'
                  : 'nv-table-sort-icon nv-table-sort-icon--active'
              }
            >
              {resolvedDirection === 'none' ? 'swap_vert' : resolvedDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
            </I>
            <span className="nv-table-sort-label">{withTextFallback(children, textProps)}</span>
          </span>
        </button>
      ) : (
        withTextFallback(children, textProps)
      )}
    </Tag>
  )
}

export function TableCaption({ children, className = '', ...props }) {
  const classes = ['nv-table-caption', className].filter(Boolean).join(' ')
  return (
    <caption className={classes} {...props}>
      {withTextFallback(children, { size: 'sm', tone: 'muted' })}
    </caption>
  )
}

