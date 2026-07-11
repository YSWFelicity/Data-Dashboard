import { Link } from 'react-router-dom'
import { formatCompact, formatFull, formatPercent } from '../utils'

function CountryRow({ country, rank }) {
  return (
    <li>
      <Link
        to={`/country/${country.id}`}
        className="country-row"
        aria-label={`View details for ${country.name}`}
      >
        <span className="col-rank">{rank}</span>

        <div className="col-country">
          <img
            className="flag"
            src={country.flag}
            alt={country.flagAlt}
            loading="lazy"
            width="44"
            height="30"
          />
          <div className="country-names">
            <span className="country-name">{country.name}</span>
            <span className="country-capital">
              Pop. {formatCompact(country.population)}
            </span>
          </div>
        </div>

        <span className="col-region">
          <span className="region-tag">{country.continent}</span>
        </span>

        <span className="col-num">
          <span className="num-value">{formatCompact(country.cases)}</span>
          <span className="num-label">
            {formatFull(country.casesPerMillion)} / 1M
          </span>
        </span>

        <span className="col-num">
          <span className="num-value">{formatCompact(country.deaths)}</span>
          <span className="num-label">deaths</span>
        </span>

        <span className="col-num">
          <span className="num-value">
            {formatPercent(country.fatalityRate)}
          </span>
          <span className="num-label">fatality</span>
        </span>

        <span className="col-chevron" aria-hidden="true">›</span>
      </Link>
    </li>
  )
}

export default function CountryList({ countries }) {
  if (!countries.length) {
    return (
      <div className="empty-state">
        <p>No countries match your search and filters.</p>
        <p className="empty-hint">
          Try lowering the “cases / 1M” slider or clearing the search.
        </p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <div className="table-head" role="row">
        <span className="col-rank">#</span>
        <span className="col-country">Country</span>
        <span className="col-region">Continent</span>
        <span className="col-num">Cases</span>
        <span className="col-num">Deaths</span>
        <span className="col-num">Fatality</span>
        <span className="col-chevron" aria-hidden="true" />
      </div>
      <ul className="country-table">
        {countries.map((c, i) => (
          <CountryRow key={c.id} country={c} rank={i + 1} />
        ))}
      </ul>
    </div>
  )
}
