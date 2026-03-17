import React from 'react'
import type { OrgRow } from '../types'
import {
  getChartDimensions,
  getConnections,
  getPosition,
  getTiers,
} from '../utils/chartLayout'

interface Props {
  rows: OrgRow[]
}

const NODE_WIDTH = 120
const NODE_HEIGHT = 56
const GAP_X = 16
const GAP_Y = 32

export const OrgChart = React.forwardRef<HTMLDivElement, Props>(function OrgChart({ rows }, ref) {
  const n = Math.max(1, rows.length)
  const byNumber = new Map(rows.map((r) => [r.number, r]))
  const { width, height } = getChartDimensions(n, NODE_WIDTH, NODE_HEIGHT, GAP_X, GAP_Y)
  const connections = getConnections(n)

  return (
    <div className="org-chart-wrapper" ref={ref}>
      <div className="org-chart-3d">
        <svg
          className="org-chart-connectors"
          width={width}
          height={height}
          style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
        >
          {connections.map(([from, to], i) => {
            const fromPos = getPosition(from, n, NODE_WIDTH, NODE_HEIGHT, GAP_X, GAP_Y, width)
            const toPos = getPosition(to, n, NODE_WIDTH, NODE_HEIGHT, GAP_X, GAP_Y, width)
            const x1 = fromPos.x
            const y1 = fromPos.y + NODE_HEIGHT
            const x2 = toPos.x
            const y2 = toPos.y
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
          {getTiers(n).flat().map((num) => {
            const pos = getPosition(num, n, NODE_WIDTH, NODE_HEIGHT, GAP_X, GAP_Y, width)
            const row = byNumber.get(num)
            const label = row?.name || (num === 1 ? 'CEO' : `#${num}`)
            const sub = row?.title || ''
            return (
              <div
                key={num}
                className="org-chart-node"
                style={{
                  left: pos.x - NODE_WIDTH / 2,
                  top: pos.y,
                  width: NODE_WIDTH,
                  height: NODE_HEIGHT,
                  animationDelay: `${(num % 10) * 0.15}s`,
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
