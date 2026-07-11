import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { casesByContinent, formatCompact, formatFull } from '../../utils'

// Color follows the ENTITY (continent), not its rank — a fixed mapping so a
// continent keeps its hue even as filters change the ordering. Slots come from
// the validated categorical palette (see index.css).
const CONTINENT_COLOR = {
  Asia: 'var(--accent-blue)',
  Europe: 'var(--accent-aqua)',
  'North America': 'var(--accent-yellow)',
  'South America': 'var(--accent-violet)',
  Africa: 'var(--accent-orange)',
  'Australia-Oceania': 'var(--accent-magenta)',
  Other: 'var(--text-muted)',
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="chart-tooltip">
      <strong>{d.continent}</strong>
      <span>{formatFull(d.cases)} cases</span>
      <span className="tt-sub">
        {d.count} {d.count === 1 ? 'country' : 'countries'} · {d.share}%
      </span>
    </div>
  )
}

export default function CasesByContinentChart({ countries }) {
  const rows = casesByContinent(countries)
  const total = rows.reduce((s, r) => s + r.cases, 0) || 1
  const data = rows.map((r) => ({
    ...r,
    share: ((r.cases / total) * 100).toFixed(1),
  }))

  return (
    <section className="chart-card">
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Where the cases are</h3>
          <p className="chart-desc">
            Share of confirmed cases by continent — the pandemic’s geographic
            footprint.
          </p>
        </div>
      </div>

      <div className="donut-layout">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="cases"
              nameKey="continent"
              innerRadius={62}
              outerRadius={98}
              paddingAngle={2}
              stroke="var(--surface-1)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((d) => (
                <Cell
                  key={d.continent}
                  fill={CONTINENT_COLOR[d.continent] || 'var(--text-muted)'}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <ul className="donut-legend">
          {data.map((d) => (
            <li key={d.continent}>
              <span
                className="legend-swatch"
                style={{
                  background: CONTINENT_COLOR[d.continent] || 'var(--text-muted)',
                }}
                aria-hidden="true"
              />
              <span className="legend-name">{d.continent}</span>
              <span className="legend-val">
                {formatCompact(d.cases)}
                <span className="legend-share"> · {d.share}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
