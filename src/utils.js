// Compact human-readable number: 1_380_000_000 -> "1.38B"
export function formatCompact(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n)
}

// Full number with thousands separators: 1380004385 -> "1,380,004,385"
export function formatFull(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat('en').format(Math.round(n))
}

// Summary statistics computed over whatever set of countries is passed in
// (so the stats respond live to the active search + filters).
export function computeStats(countries) {
  const count = countries.length
  const totalCases = countries.reduce((sum, c) => sum + c.cases, 0)
  const totalDeaths = countries.reduce((sum, c) => sum + c.deaths, 0)

  // Overall case-fatality rate across the visible set (deaths / cases).
  const fatalityRate = totalCases > 0 ? (totalDeaths / totalCases) * 100 : 0

  // Country hit hardest per capita (highest cases per million people).
  const highestPerCapita = countries.reduce(
    (max, c) => (c.casesPerMillion > (max?.casesPerMillion ?? -1) ? c : max),
    null,
  )

  return { count, totalCases, totalDeaths, fatalityRate, highestPerCapita }
}

// Percentage with one decimal place: 2.134 -> "2.1%"
export function formatPercent(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return `${n.toFixed(1)}%`
}
