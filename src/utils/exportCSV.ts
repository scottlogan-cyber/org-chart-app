import type { OrgRow } from '../types'

export function exportCSV(rows: OrgRow[]): void {
  const header = 'number,name,title'
  const lines = rows.map((r) => `${r.number},"${(r.name || '').replace(/"/g, '""')}","${(r.title || '').replace(/"/g, '""')}"`)
  const csv = [header, ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'org-chart-export.csv'
  a.click()
  URL.revokeObjectURL(url)
}
