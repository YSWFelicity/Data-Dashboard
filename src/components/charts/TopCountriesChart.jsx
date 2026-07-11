import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import { formatCompact, formatFull, topCountriesBy } from '../../utils'

// Two views of the SAME chart the user can toggle between (stretch feature):
//  - absolute: which countries have the most confirmed cases
//  - percapita: which countries were hit hardest relative to population
const METRICS = {
  absolute: { key: 'cases', label: 'Total cases', unit: 'cases' },
  percapita: {
    key: 'casesPerMillion',
    label: 'Cases per million',
    unit: 'per 1M',
  },
}

function ChartTooltip({ active, payload, unit }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="chart-tooltip">
      <strong>{d.name}</strong>
      <span>
        {formatFull(payload[0].value)} {unit}
      </span>
    </div>
  )
}

export default function TopCountriesChart({ countries }) {
  const [metricKey, setMetricKey] = useState('absolute')
  const navigate = useNavigate()
  const metric = METRICS[metricKey]

  const data = topCountriesBy(countries, metric.key, 10).map((c) => ({
    id: c.id,
    name: c.name,
    value: c[metric.key],
  }))

  return (
    <section className="chart-card">
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Top 10 countries</h3>
          <p className="chart-desc">
            {metricKey === 'absolute'
              ? 'Ranked by total confirmed cases — the raw scale of the pandemic.'
              : 'Ranked by cases per million — impact relative to population size.'}
          </p>
        </div>
        <div className="toggle-group" role="group" aria-label="Choose metric">
          {Object.entries(METRICS).map(([k, m]) => (
            <button
              key={k}
              type="button"
              className={`toggle-btn ${k === metricKey ? 'active' : ''}`}
              onClick={() => setMetricKey(k)}
              aria-pressed={k === metricKey}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke="var(--gridline)"
            strokeDasharray="0"
          />
          <XAxis
            type="number"
            tickFormatter={formatCompact}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            stroke="var(--baseline)"
          />
          <YAxis
            type="category"
            dataKey="name"
            width={104}
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            stroke="var(--baseline)"
          />
          <Tooltip
            cursor={{ fill: 'var(--surface-2)' }}
            content={<ChartTooltip unit={metric.unit} />}
          />
          <Bar
            dataKey="value"
            fill="var(--accent-blue)"
            radius={[0, 4, 4, 0]}
            cursor="pointer"
            isAnimationActive={false}
            onClick={(d) => d?.id && navigate(`/country/${d.id}`)}
          >
            {data.map((d) => (
              <Cell key={d.id} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-hint">Tip: click a bar to open that country’s details.</p>
    </section>
  )
}
