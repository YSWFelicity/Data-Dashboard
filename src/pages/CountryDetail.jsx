import { Link, useParams } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  formatCompact,
  formatFull,
  formatPercent,
} from '../utils'

// One tile in the detail stat grid.
function DetailStat({ label, value, sub, accent }) {
  return (
    <div className="detail-stat" style={{ '--stat-accent': accent }}>
      <span className="detail-stat-label">{label}</span>
      <span className="detail-stat-value">{value}</span>
      {sub && <span className="detail-stat-sub">{sub}</span>}
    </div>
  )
}

function OutcomeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <strong>{payload[0].payload.name}</strong>
      <span>{formatFull(payload[0].value)} people</span>
    </div>
  )
}

export default function CountryDetail({ countries }) {
  // React Router gives us the :id segment from the URL.
  const { id } = useParams()
  const country = countries.find((c) => c.id === id)

  if (!country) {
    return (
      <div className="empty-state">
        <p>We couldn’t find a country with the id “{id}”.</p>
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const {
    name,
    flag,
    flagAlt,
    continent,
    population,
    cases,
    deaths,
    recovered,
    active,
    critical,
    tests,
    casesPerMillion,
    deathsPerMillion,
    testsPerMillion,
    todayCases,
    todayDeaths,
    fatalityRate,
  } = country

  const recoveryRate = cases > 0 ? (recovered / cases) * 100 : 0
  const percentInfected = population > 0 ? (cases / population) * 100 : 0
  const testsPerCase = cases > 0 ? tests / cases : 0

  // Case-outcome breakdown: extra data (recovered/active) not on the dashboard.
  const outcome = [
    { name: 'Recovered', value: recovered, color: 'var(--accent-aqua)' },
    { name: 'Active', value: active, color: 'var(--accent-yellow)' },
    { name: 'Deaths', value: deaths, color: 'var(--accent-orange)' },
  ].filter((o) => o.value > 0)
  const hasOutcome = outcome.length > 0

  return (
    <div className="detail">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>

      <header className="detail-header">
        <img className="detail-flag" src={flag} alt={flagAlt} />
        <div>
          <h1 className="detail-title">{name}</h1>
          <p className="detail-meta">
            <span className="region-tag">{continent}</span>
            <span className="detail-pop">
              Population {formatFull(population)}
            </span>
          </p>
        </div>
      </header>

      <p className="detail-lead">
        {name} has recorded <strong>{formatFull(cases)}</strong> confirmed cases
        and <strong>{formatFull(deaths)}</strong> deaths — infecting roughly{' '}
        <strong>{formatPercent(percentInfected)}</strong> of its population, with
        a case-fatality rate of <strong>{formatPercent(fatalityRate)}</strong>.
      </p>

      <div className="detail-grid">
        <DetailStat
          label="Confirmed cases"
          value={formatCompact(cases)}
          sub={`${formatFull(casesPerMillion)} per million`}
          accent="var(--accent-blue)"
        />
        <DetailStat
          label="Deaths"
          value={formatCompact(deaths)}
          sub={`${formatFull(deathsPerMillion)} per million`}
          accent="var(--accent-orange)"
        />
        <DetailStat
          label="Recovered"
          value={recovered > 0 ? formatCompact(recovered) : '—'}
          sub={
            recovered > 0
              ? `${formatPercent(recoveryRate)} recovery rate`
              : 'not reported'
          }
          accent="var(--accent-aqua)"
        />
        <DetailStat
          label="Active cases"
          value={active > 0 ? formatCompact(active) : '—'}
          sub={
            critical > 0 ? `${formatFull(critical)} critical` : 'not reported'
          }
          accent="var(--accent-yellow)"
        />
        <DetailStat
          label="Total tests"
          value={tests > 0 ? formatCompact(tests) : '—'}
          sub={
            tests > 0
              ? `${formatFull(testsPerMillion)} per million`
              : 'not reported'
          }
          accent="var(--accent-violet)"
        />
        <DetailStat
          label="Tests per case"
          value={testsPerCase > 0 ? testsPerCase.toFixed(1) : '—'}
          sub="higher = wider testing"
          accent="var(--accent-magenta)"
        />
      </div>

      {(todayCases > 0 || todayDeaths > 0) && (
        <p className="detail-today">
          📅 Reported today: <strong>{formatFull(todayCases)}</strong> new cases
          {todayDeaths > 0 && (
            <>
              {' '}
              and <strong>{formatFull(todayDeaths)}</strong> new deaths
            </>
          )}
          .
        </p>
      )}

      <section className="chart-card">
        <div className="chart-head">
          <div>
            <h3 className="chart-title">Case outcomes</h3>
            <p className="chart-desc">
              How {name}’s confirmed cases break down into recovered, still
              active, and fatal.
            </p>
          </div>
        </div>
        {hasOutcome ? (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={outcome}
              layout="vertical"
              margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
            >
              <XAxis
                type="number"
                tickFormatter={formatCompact}
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                stroke="var(--baseline)"
              />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                stroke="var(--baseline)"
              />
              <Tooltip
                cursor={{ fill: 'var(--surface-2)' }}
                content={<OutcomeTooltip />}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                {outcome.map((o) => (
                  <Cell key={o.name} fill={o.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="empty-hint">
            Recovered and active-case counts aren’t reported for {name} in this
            dataset.
          </p>
        )}
      </section>
    </div>
  )
}
