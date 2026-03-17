import type { OrgRow } from '../types'

export function parseCSV(text: string): OrgRow[] {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length === 0) return []
  const rows: OrgRow[] = []
  const header = lines[0].toLowerCase()
  const hasHeader = header.includes('number') || header.includes('name') || header.includes('title')
  const start = hasHeader ? 1 : 0
  for (let i = start; i < lines.length; i++) {
    const line = lines[i]
    const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''))
    const num = parseInt(parts[0], 10)
    if (isNaN(num) || num < 1) continue
    rows.push({
      number: num,
      name: parts[1] ?? '',
      title: parts[2] ?? '',
    })
  }
  return rows
}
