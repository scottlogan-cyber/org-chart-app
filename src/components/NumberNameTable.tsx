import type { OrgRow } from '../types'

interface Props {
  rows: OrgRow[]
  onChange: (rows: OrgRow[]) => void
}

const DEFAULT_ROWS = 10

export function NumberNameTable({ rows, onChange }: Props) {
  const ensureRows = (): OrgRow[] => {
    const result = [...rows]
    while (result.length < DEFAULT_ROWS) {
      result.push({ number: result.length + 1, name: '', title: '' })
    }
    return result.slice(0, DEFAULT_ROWS)
  }

  const current = ensureRows()

  const update = (index: number, field: 'name' | 'title', value: string) => {
    const next = current.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    )
    onChange(next)
  }

  return (
    <div className="number-name-table">
      <h3>Position → Name</h3>
      <p className="table-hint">1 = CEO, 2–5 = C-suite, 6–8 = Managers, 9–10 = Team</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {current.map((row, i) => (
            <tr key={row.number}>
              <td>{row.number}</td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => update(i, 'name', e.target.value)}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) => update(i, 'title', e.target.value)}
                  placeholder="Title"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
