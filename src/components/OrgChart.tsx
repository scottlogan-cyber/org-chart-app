import React from 'react'
import type { OrgRow } from '../types'

interface Props {
  rows: OrgRow[]
}

const NODE_WIDTH = 140
const NODE_HEIGHT = 72
const GAP_X = 24
const GAP_Y = 48

function getPosition(role: number): { x: number; y: number } {
  const rowW = NODE_WIDTH + GAP_X
  if (role === 1) return { x: 2 * rowW, y: 0 }
  if (role >= 2 && role <= 5) {
    const i = role - 2
    return { x: (i + 0.5) * rowW, y: NODE_HEIGHT + GAP_Y }
  }
  if (role >= 6 && role <= 8) {
    const i = role - 6
    return { x: (i + 1) * rowW, y: 2 * (NODE_HEIGHT + GAP_Y) }
  }
  if (role >= 9 && role <= 10) {
    const i = role - 9
    return { x: (i + 1.5) * rowW, y: 3 * (NODE_HEIGHT + GAP_Y) }
  }
  return { x: 0, y: 0 }
}

const CONNECTIONS: [number, number][] = [
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  [4, 8],
  [6, 9],
  [7, 10],
]

export const OrgChart = React.forwardRef<HTMLDivElement, Props>(function OrgChart({ rows }, ref) {
  const byNumber = new Map(rows.map((r) => [r.number, r]))

  const width = 4 * (NODE_WIDTH + GAP_X)
  const height = 3 * (NODE_HEIGHT + GAP_Y) + NODE_HEIGHT

  return (
    <div className="org-chart-wrapper" ref={ref}>
      <div className="org-chart-3d">
        <svg
          className="org-chart-connectors"
          width={width}
          height={height}
          style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
        >
          {CONNECTIONS.map(([from, to], i) => {
            const fromPos = getPosition(from)
            const toPos = getPosition(to)
            const x1 = fromPos.x
            const y1 = fromPos.y + NODE_HEIGHT
            const x2 = toPos.x
            const y2 = toPos.y
            // fromPos/toPos are center-x; connector goes to node center top/bottom
            const midY = (y1 + y2) / 2
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
              />
            )
          })}
        </svg>
        <div className="org-chart-nodes" style={{ width, height, position: 'relative' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
            const pos = getPosition(n)
            const row = byNumber.get(n)
            const label = row?.name || (n === 1 ? 'CEO' : `#${n}`)
            const sub = row?.title || ''
            return (
              <div
                key={n}
                className="org-chart-node"
                style={{
                  left: pos.x - NODE_WIDTH / 2,
                  top: pos.y,
                  width: NODE_WIDTH,
                  height: NODE_HEIGHT,
                }}
              >
                <div className="org-chart-node-label">{label}</div>
                {sub && <div className="org-chart-node-title">{sub}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})
