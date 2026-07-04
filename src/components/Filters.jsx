import { formatCompact } from '../utils'

export default function Filters({
  search,
  onSearchChange,
  continent,
  onContinentChange,
  continents,
  minCasesPerMillion,
  maxCasesPerMillionBound,
  onMinCasesPerMillionChange,
  onReset,
}) {
  return (
    <section className="filters" aria-label="Search and filters">
      <div className="filter-field grow">
        <label htmlFor="search">Search by country</label>
        <input
          id="search"
          type="search"
          placeholder="Try “United”, “land”, or “Korea”…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="filter-field">
        <label htmlFor="continent">Continent</label>
        <select
          id="continent"
          value={continent}
          onChange={(e) => onContinentChange(e.target.value)}
        >
          <option value="all">All continents</option>
          {continents.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field grow">
        <label htmlFor="perCapita">
          Min. cases / 1M:{' '}
          <strong>{formatCompact(minCasesPerMillion)}</strong>
        </label>
        <input
          id="perCapita"
          type="range"
          min="0"
          max={maxCasesPerMillionBound}
          step="5000"
          value={minCasesPerMillion}
          onChange={(e) => onMinCasesPerMillionChange(Number(e.target.value))}
        />
      </div>

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </section>
  )
}
