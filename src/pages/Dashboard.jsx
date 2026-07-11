import { useMemo, useState } from 'react'
import { computeStats } from '../utils'
import SummaryStats from '../components/SummaryStats'
import Filters from '../components/Filters'
import CountryList from '../components/CountryList'
import TopCountriesChart from '../components/charts/TopCountriesChart'
import CasesByContinentChart from '../components/charts/CasesByContinentChart'

export default function Dashboard({ countries }) {
  // Filter state lives with the dashboard (the detail view doesn't need it).
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('all')
  const [minCasesPerMillion, setMinCasesPerMillion] = useState(0)

  const continents = useMemo(
    () => [...new Set(countries.map((c) => c.continent))].sort(),
    [countries],
  )

  const maxCasesPerMillionBound = useMemo(() => {
    const max = countries.reduce((m, c) => Math.max(m, c.casesPerMillion), 0)
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

  // Stats + charts recompute from the filtered set, so they update live.
  const stats = useMemo(() => computeStats(filtered), [filtered])

  function handleReset() {
    setSearch('')
    setContinent('all')
    setMinCasesPerMillion(0)
  }

  return (
    <>
      <header className="page-header">
        <h1>Global COVID-19 Dashboard</h1>
        <p className="subtitle">
          Confirmed cases, deaths, and per-capita impact for every country —
          data live from the disease.sh open API. Search, filter, and click any
          country for a closer look.
        </p>
      </header>

      <SummaryStats stats={stats} />

      <div className="charts-grid">
        <TopCountriesChart countries={filtered} />
        <CasesByContinentChart countries={filtered} />
      </div>

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
    </>
  )
}
