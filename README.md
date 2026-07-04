# 🦠 Global COVID-19 Dashboard

A React + Vite data dashboard that tells the story of COVID-19's global
footprint — confirmed cases, deaths, and per-capita impact for every country —
using live data from the free [disease.sh](https://disease.sh/) open API.

## ✨ Features

- **Live data fetch** with the `useEffect` hook and `async/await` (see
  [src/App.jsx](src/App.jsx) and [src/api.js](src/api.js)).
- **231 countries**, one per row, each showing continent, population, cases,
  cases-per-million, deaths, and case-fatality rate.
- **Three+ summary statistics** that recompute live from the filtered set:
  countries shown, total cases, total deaths (with overall case-fatality
  rate), and the country hit hardest per capita.
- **Search bar** that filters the list by country name as you type.
- **Continent filter** (dropdown) restricting the list by a different
  attribute than the search bar.
- **Stretch: multiple simultaneous filters with different input types** — text
  search + dropdown + a "minimum cases per million" range slider, all applied
  together.
- Responsive layout with light/dark support.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```

## 🗂️ Structure

- [src/api.js](src/api.js) — fetches and normalizes the disease.sh data.
- [src/utils.js](src/utils.js) — number/percent formatters and stat computation.
- [src/App.jsx](src/App.jsx) — data fetching, filter state, and composition.
- [src/components/](src/components/) — `SummaryStats`, `Filters`, `CountryList`.

## 📡 Data source

[disease.sh](https://disease.sh/) — an open COVID-19 API, no API key required.
