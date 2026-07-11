// disease.sh — open COVID-19 data API. Free, no API key required.
// Docs: https://disease.sh/docs/
const ENDPOINT = 'https://disease.sh/v3/covid-19/countries'

// Normalize the raw API response into a flat, list-friendly shape.
function normalize(raw) {
  return raw
    .map((c) => {
      const cases = c.cases ?? 0
      const deaths = c.deaths ?? 0
      return {
        id: c.countryInfo?.iso3 || c.country,
        name: c.country ?? 'Unknown',
        continent: c.continent || 'Other',
        population: c.population ?? 0,
        cases,
        deaths,
        recovered: c.recovered ?? 0,
        active: c.active ?? 0,
        critical: c.critical ?? 0,
        tests: c.tests ?? 0,
        casesPerMillion: c.casesPerOneMillion ?? 0,
        deathsPerMillion: c.deathsPerOneMillion ?? 0,
        testsPerMillion: c.testsPerOneMillion ?? 0,
        todayCases: c.todayCases ?? 0,
        todayDeaths: c.todayDeaths ?? 0,
        flag: c.countryInfo?.flag || '',
        flagAlt: `Flag of ${c.country ?? 'country'}`,
        // Case fatality rate = deaths / confirmed cases, as a percentage.
        fatalityRate: cases > 0 ? (deaths / cases) * 100 : 0,
      }
    })
    .sort((a, b) => b.cases - a.cases)
}

export async function fetchCountries() {
  const res = await fetch(ENDPOINT)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  const data = await res.json()
  return normalize(data)
}
