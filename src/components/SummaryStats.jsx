import { formatCompact, formatFull, formatPercent } from '../utils'

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card" style={{ '--stat-accent': accent }}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-sub">{sub}</span>
    </div>
  )
}

export default function SummaryStats({ stats }) {
  const { count, totalCases, totalDeaths, fatalityRate, highestPerCapita } =
    stats

  return (
    <section className="stats-grid" aria-label="Summary statistics">
      <StatCard
        label="Countries shown"
        value={formatFull(count)}
        sub="matching current filters"
        accent="var(--accent-blue)"
      />
      <StatCard
        label="Total cases"
        value={formatCompact(totalCases)}
        sub={`${formatFull(totalCases)} confirmed`}
        accent="var(--accent-yellow)"
      />
      <StatCard
        label="Total deaths"
        value={formatCompact(totalDeaths)}
        sub={`${formatPercent(fatalityRate)} case-fatality rate`}
        accent="var(--accent-orange)"
      />
      <StatCard
        label="Hardest hit per capita"
        value={highestPerCapita ? highestPerCapita.name : '—'}
        sub={
          highestPerCapita
            ? `${formatFull(highestPerCapita.casesPerMillion)} cases / 1M`
            : 'no matches'
        }
        accent="var(--accent-violet)"
      />
    </section>
  )
}
