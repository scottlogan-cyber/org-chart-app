import type { OrgRow } from '../types'

interface Props {
  rows: OrgRow[]
  onChange: (rows: OrgRow[]) => void
  maxRows?: number
}

export function NumberNameTable({ rows, onChange, maxRows }: Props) {
  const update = (index: number, field: 'name' | 'title', value: string) => {
    const next = rows.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    )
    onChange(next)
  }

  return (
    <div className="number-name-table">
      <h3>Position → Name</h3>
      <p className="table-hint">1 = CEO, then tiers by row. Change chart size above to add more positions.</p>
      <div className="number-name-table-scroll">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
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
    </div>
  )
}
