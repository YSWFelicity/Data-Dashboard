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

### Part 2 — routing, detail views & charts

- **React Router** navigation (`react-router-dom`): a dashboard route `/` and a
  dynamic detail route `/country/:id`. Each country has a **unique, direct
  link** to its own page — extracted with the `useParams()` hook (see
  [src/pages/CountryDetail.jsx](src/pages/CountryDetail.jsx)).
- **Clickable list** — every row in the dashboard is a `Link` to that country's
  detail view ([src/components/CountryList.jsx](src/components/CountryList.jsx)).
- **Detail view with extra data** not shown on the dashboard: recovered, active
  & critical cases, total tests, tests-per-million, tests-per-case, recovery
  rate, and share of population infected — plus a case-outcomes chart.
- **Shared sidebar** rendered on both the dashboard and detail views, with a
  live worldwide snapshot ([src/components/Sidebar.jsx](src/components/Sidebar.jsx)).
- **Two dashboard charts** (built with [Recharts](https://recharts.org/), each
  describing a different aspect of the data):
  - *Top 10 countries* — a bar chart of magnitude (raw scale of the pandemic).
  - *Where the cases are* — a donut chart of the case distribution by continent.
- **Stretch: toggle between visualizations** — the top-countries chart switches
  between *total cases* and *cases per million*, and clicking a bar opens that
  country's detail page.
- **Stretch: annotated dashboard** — each chart and stat carries a short
  description explaining what's interesting about the data.

## 🎥 Demo video

[Watch the demo](https://drive.google.com/file/d/1FNE5w3IiJD8A_OMVajB4zWFnPJ9xIWDG/view?usp=sharing)

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```

## 🗂️ Structure

- [src/api.js](src/api.js) — fetches and normalizes the disease.sh data.
- [src/utils.js](src/utils.js) — formatters, stat computation, and chart aggregations.
- [src/App.jsx](src/App.jsx) — data fetching, layout shell, and route definitions.
- [src/pages/](src/pages/) — `Dashboard` (filters + stats + charts + list) and
  `CountryDetail` (the per-country detail view).
- [src/components/](src/components/) — `Sidebar`, `SummaryStats`, `Filters`,
  `CountryList`, and `charts/` (`TopCountriesChart`, `CasesByContinentChart`).
