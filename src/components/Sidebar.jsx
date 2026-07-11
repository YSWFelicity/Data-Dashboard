import { Link, NavLink } from 'react-router-dom'
import { formatCompact, formatPercent } from '../utils'

// Shared sidebar rendered on BOTH the dashboard and the detail view.
// Shows global branding, navigation, and a live worldwide snapshot that
// is derived from the full (unfiltered) dataset so it stays constant as
// you move between pages.
export default function Sidebar({ countries }) {
  const totalCases = countries.reduce((s, c) => s + c.cases, 0)
  const totalDeaths = countries.reduce((s, c) => s + c.deaths, 0)
  const fatality = totalCases > 0 ? (totalDeaths / totalCases) * 100 : 0
  const topCountry = countries.reduce(
    (max, c) => (c.cases > (max?.cases ?? -1) ? c : max),
    null,
  )

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">🦠</span>
          <span className="brand-text">
            <span className="brand-title">COVID-19</span>
            <span className="brand-sub">Global Dashboard</span>
          </span>
        </Link>

        <nav className="sidebar-nav" aria-label="Primary">
          <NavLink to="/" end className="nav-link">
            <span aria-hidden="true">📊</span> Dashboard
          </NavLink>
        </nav>

        <div className="sidebar-section">
          <h2 className="sidebar-heading">Worldwide snapshot</h2>
          <ul className="mini-stats">
            <li>
              <span className="mini-label">Total cases</span>
              <span className="mini-value">{formatCompact(totalCases)}</span>
            </li>
            <li>
              <span className="mini-label">Total deaths</span>
              <span className="mini-value">{formatCompact(totalDeaths)}</span>
            </li>
            <li>
              <span className="mini-label">Case-fatality</span>
              <span className="mini-value">{formatPercent(fatality)}</span>
            </li>
            <li>
              <span className="mini-label">Countries tracked</span>
              <span className="mini-value">{countries.length}</span>
            </li>
          </ul>
        </div>

        {topCountry && (
          <div className="sidebar-section">
            <h2 className="sidebar-heading">Most cases</h2>
            <Link to={`/country/${topCountry.id}`} className="mini-country">
              <img
                className="flag"
                src={topCountry.flag}
                alt={topCountry.flagAlt}
                width="32"
                height="22"
                loading="lazy"
              />
              <span>
                <span className="mini-country-name">{topCountry.name}</span>
                <span className="mini-country-sub">
                  {formatCompact(topCountry.cases)} cases
                </span>
              </span>
            </Link>
          </div>
        )}

        <p className="sidebar-foot">
          Data:{' '}
          <a href="https://disease.sh/" target="_blank" rel="noreferrer">
            disease.sh
          </a>
        </p>
      </div>
    </aside>
  )
}
