import React, { useRef, useState } from 'react'
import { NumberNameTable } from './components/NumberNameTable'
import { OrgChart } from './components/OrgChart'
import type { OrgRow } from './types'
import { exportCSV } from './utils/exportCSV'
import { exportPDF } from './utils/exportPDF'
import { parseCSV } from './utils/parseCSV'
import './App.css'

const INITIAL_ROWS: OrgRow[] = [
  { number: 1, name: '', title: 'CEO' },
  { number: 2, name: '', title: '' },
  { number: 3, name: '', title: '' },
  { number: 4, name: '', title: '' },
  { number: 5, name: '', title: '' },
  { number: 6, name: '', title: '' },
  { number: 7, name: '', title: '' },
  { number: 8, name: '', title: '' },
  { number: 9, name: '', title: '' },
  { number: 10, name: '', title: '' },
]

function App() {
  const [rows, setRows] = useState<OrgRow[]>(INITIAL_ROWS)
  const chartRef = useRef<HTMLDivElement>(null)

  const handleExportPDF = async () => {
    if (!chartRef.current) return
    await exportPDF(chartRef.current)
  }

  const handleExportCSV = () => {
    exportCSV(rows)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      const parsed = parseCSV(text)
      if (parsed.length > 0) {
        const merged: OrgRow[] = [...INITIAL_ROWS]
        for (const p of parsed) {
          const i = merged.findIndex((r) => r.number === p.number)
          if (i >= 0) merged[i] = { ...merged[i], name: p.name, title: p.title }
        }
        setRows(merged)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="app">
      <div className="editor-panel">
        <h2>Org Chart</h2>
        <NumberNameTable rows={rows} onChange={setRows} />
        <div className="actions">
          <button type="button" className="export-pdf" onClick={handleExportPDF}>
            Export PDF
          </button>
          <button type="button" className="export-csv" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
        <div className="upload-area">
          <label htmlFor="csv-upload">Re-upload previously exported CSV to update</label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="chart-panel">
        <OrgChart ref={chartRef} rows={rows} />
      </div>
    </div>
  )
}

export default App
