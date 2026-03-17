import React, { useRef, useState } from 'react'
import { NumberNameTable } from './components/NumberNameTable'
import { OrgChart } from './components/OrgChart'
import type { OrgRow } from './types'
import { exportCSV } from './utils/exportCSV'
import { exportPDF } from './utils/exportPDF'
import { parseCSV } from './utils/parseCSV'
import './App.css'

const CHART_SIZE_OPTIONS = [10, 20, 30, 40, 50, 75, 100]

function createRows(count: number): OrgRow[] {
  const rows: OrgRow[] = []
  for (let i = 1; i <= count; i++) {
    rows.push({
      number: i,
      name: '',
      title: i === 1 ? 'CEO' : '',
    })
  }
  return rows
}

function mergeRows(existing: OrgRow[], newCount: number): OrgRow[] {
  const next = createRows(newCount)
  for (const r of existing) {
    if (r.number <= newCount) {
      const i = next.findIndex((x) => x.number === r.number)
      if (i >= 0) next[i] = { ...next[i], name: r.name, title: r.title }
    }
  }
  return next
}

function App() {
  const [chartSize, setChartSize] = useState(10)
  const [rows, setRows] = useState<OrgRow[]>(() => createRows(10))
  const [customConnections, setCustomConnections] = useState<[number, number][]>([])
  const chartRef = useRef<HTMLDivElement>(null)

  const handleChartSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = parseInt(e.target.value, 10)
    setChartSize(next)
    setRows((prev) => mergeRows(prev, next))
  }

  const handleConnectionAdded = (from: number, to: number) => {
    setCustomConnections((prev) => [...prev, [from, to]])
  }

  const handleResetConnections = () => {
    setCustomConnections([])
  }

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
        const maxNum = Math.max(...parsed.map((p) => p.number), chartSize)
        const newSize = Math.min(100, Math.max(chartSize, maxNum))
        setChartSize(newSize)
        setRows((prev) => {
          const merged = mergeRows(prev, newSize)
          for (const p of parsed) {
            if (p.number <= newSize) {
              const i = merged.findIndex((r) => r.number === p.number)
              if (i >= 0) merged[i] = { ...merged[i], name: p.name, title: p.title }
            }
          }
          return merged
        })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="app">
      <div className="editor-panel">
        <h2>Org Chart</h2>
        <NumberNameTable rows={rows} onChange={setRows} maxRows={chartSize} />
        <div className="chart-size-row">
          <label htmlFor="chart-size">Chart size</label>
          <select
            id="chart-size"
            value={chartSize}
            onChange={handleChartSizeChange}
            className="chart-size-select"
          >
            {CHART_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} positions
              </option>
            ))}
          </select>
        </div>
        <div className="connection-hint">
          Click an orb on one node, then an orb on another to link them. Layout stays the same.
        </div>
        {customConnections.length > 0 && (
          <button
            type="button"
            className="reset-connections"
            onClick={handleResetConnections}
          >
            Reset to default layout
          </button>
        )}
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
        <OrgChart
          ref={chartRef}
          rows={rows}
          customConnections={customConnections.length > 0 ? customConnections : undefined}
          onConnectionAdded={handleConnectionAdded}
        />
      </div>
    </div>
  )
}

export default App
