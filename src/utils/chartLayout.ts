/** Max nodes per row after CEO. Fills tiers until we have N total. */
const ROW_CAPS = [5, 8, 12, 16, 20, 24, 28, 32]

export function getTiers(n: number): number[][] {
  if (n <= 0) return []
  const tiers: number[][] = [[1]]
  let next = 2
  let capIndex = 0
  while (next <= n) {
    const cap = ROW_CAPS[capIndex] ?? 32
    const count = Math.min(cap, n - next + 1)
    const tier: number[] = []
    for (let i = 0; i < count; i++) tier.push(next++)
    tiers.push(tier)
    capIndex++
  }
  return tiers
}

export function getConnections(n: number): [number, number][] {
  const tiers = getTiers(n)
  const out: [number, number][] = []
  for (let t = 1; t < tiers.length; t++) {
    const parents = tiers[t - 1]
    const children = tiers[t]
    const pCount = parents.length
    const cCount = children.length
    for (let i = 0; i < cCount; i++) {
      const parentIndex = Math.min(Math.floor((i * pCount) / cCount), pCount - 1)
      out.push([parents[parentIndex], children[i]])
    }
  }
  return out
}

export function getPosition(
  role: number,
  n: number,
  nodeWidth: number,
  nodeHeight: number,
  gapX: number,
  gapY: number,
  chartWidth: number
): { x: number; y: number } {
  const tiers = getTiers(n)
  let tierIndex = -1
  let indexInTier = -1
  for (let t = 0; t < tiers.length; t++) {
    const i = tiers[t].indexOf(role)
    if (i >= 0) {
      tierIndex = t
      indexInTier = i
      break
    }
  }
  if (tierIndex < 0) return { x: 0, y: 0 }
  const tier = tiers[tierIndex]
  const tierLen = tier.length
  const y = tierIndex * (nodeHeight + gapY)
  const tierWidth = tierLen * nodeWidth + (tierLen - 1) * gapX
  const startX = (chartWidth - tierWidth) / 2
  const x = startX + indexInTier * (nodeWidth + gapX) + nodeWidth / 2
  return { x, y }
}

export function getChartDimensions(
  n: number,
  nodeWidth: number,
  nodeHeight: number,
  gapX: number,
  gapY: number
): { width: number; height: number } {
  const tiers = getTiers(n)
  let maxWidth = nodeWidth
  for (const tier of tiers) {
    const w = tier.length * nodeWidth + (tier.length - 1) * gapX
    if (w > maxWidth) maxWidth = w
  }
  const height = tiers.length * (nodeHeight + gapY)
  return { width: maxWidth, height }
}
