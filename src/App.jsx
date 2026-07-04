import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { fetchCountries } from './api'
import { computeStats } from './utils'
import SummaryStats from './components/SummaryStats'
import Filters from './components/Filters'
import CountryList from './components/CountryList'

export default function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter state
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('all')
  const [minCasesPerMillion, setMinCasesPerMillion] = useState(0)

  // Fetch once on mount using useEffect + async/await.
  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        const data = await fetchCountries()
        if (active) {
          setCountries(data)
          setError(null)
        }
      } catch (err) {
        if (active) setError(err.message || 'Failed to load data')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  // Distinct continents for the dropdown, derived from the data.
  const continents = useMemo(
    () => [...new Set(countries.map((c) => c.continent))].sort(),
    [countries],
  )

  // Slider ceiling: round the highest per-capita value up to a clean step.
  const maxCasesPerMillionBound = useMemo(() => {
    const max = countries.reduce(
      (m, c) => Math.max(m, c.casesPerMillion),
      0,
    )
    return Math.ceil(max / 5000) * 5000 || 5000
  }, [countries])

  // Apply search + continent + per-capita filters together.
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return countries.filter((c) => {
      const matchesSearch = !query || c.name.toLowerCase().includes(query)
      const matchesContinent =
        continent === 'all' || c.continent === continent
      const matchesPerCapita = c.casesPerMillion >= minCasesPerMillion
      return matchesSearch && matchesContinent && matchesPerCapita
    })
  }, [countries, search, continent, minCasesPerMillion])

  // Stats recompute from the filtered set, so they update live.
  const stats = useMemo(() => computeStats(filtered), [filtered])

  function handleReset() {
    setSearch('')
    setContinent('all')
    setMinCasesPerMillion(0)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="title-block">
          <h1>🦠 Global COVID-19 Dashboard</h1>
          <p className="subtitle">
            Confirmed cases, deaths, and per-capita impact for every country —
            data live from the disease.sh open API. Search, filter by
            continent, and watch the story change.
          </p>
        </div>
      </header>

      {loading && (
        <div className="status-panel">
          <div className="spinner" aria-hidden="true" />
          <p>Loading global data…</p>
        </div>
      )}

      {error && !loading && (
        <div className="status-panel error">
          <p>⚠️ Couldn’t load data: {error}</p>
          <p className="empty-hint">Check your connection and refresh the page.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <SummaryStats stats={stats} />

          <Filters
            search={search}
            onSearchChange={setSearch}
            continent={continent}
            onContinentChange={setContinent}
            continents={continents}
            minCasesPerMillion={minCasesPerMillion}
            maxCasesPerMillionBound={maxCasesPerMillionBound}
            onMinCasesPerMillionChange={setMinCasesPerMillion}
            onReset={handleReset}
          />

          <div className="results-meta">
            Showing <strong>{filtered.length}</strong> of {countries.length}{' '}
            countries
          </div>

          <CountryList countries={filtered} />

          <footer className="app-footer">
            Data:{' '}
            <a href="https://disease.sh/" target="_blank" rel="noreferrer">
              disease.sh open COVID-19 API
            </a>
          </footer>
        </>
      )}
    </div>
  )
}
