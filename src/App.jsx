import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { fetchCountries } from './api'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CountryDetail from './pages/CountryDetail'

export default function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div className="layout">
      <Sidebar countries={countries} />

      <main className="main">
        {loading && (
          <div className="status-panel">
            <div className="spinner" aria-hidden="true" />
            <p>Loading global data…</p>
          </div>
        )}

        {error && !loading && (
          <div className="status-panel error">
            <p>⚠️ Couldn’t load data: {error}</p>
            <p className="empty-hint">
              Check your connection and refresh the page.
            </p>
          </div>
        )}

        {!loading && !error && (
          <Routes>
            <Route path="/" element={<Dashboard countries={countries} />} />
            <Route
              path="/country/:id"
              element={<CountryDetail countries={countries} />}
            />
          </Routes>
        )}
      </main>
    </div>
  )
}
