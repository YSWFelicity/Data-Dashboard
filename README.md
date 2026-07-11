# Web Development Project 6 - *Global COVID-19 Dashboard*

Submitted by: **Yingshu Wang**

This web app: **An interactive dashboard that tells the story of COVID-19's global footprint using live data from the free [disease.sh](https://disease.sh/) open API. The dashboard lists 231 countries with their cases, deaths, and per-capita impact, surfaces summary statistics and two charts, and lets you search and filter the data. Clicking any country (or a bar in the chart) opens a dedicated detail view with a unique URL, showing extra data — recovered, active, and critical cases, testing figures, recovery rate, and the share of population infected — alongside a case-outcomes chart.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
  - Each chart and summary statistic carries a short description explaining what the data shows.
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 
  - The "Top 10 countries" chart toggles between *Total cases* and *Cases per million*.

  
The following **additional** features are implemented:

* [x] **Persistent shared sidebar** with a live worldwide snapshot (total cases, deaths, case-fatality rate, countries tracked, and the country with the most cases) shown on both the dashboard and every detail view.
* [x] **Charts are interactive** — hovering any bar or donut slice shows a custom tooltip, and clicking a bar in the "Top 10" chart navigates directly to that country's detail page.
* [x] **Three simultaneous filters** with different input types — a text search, a continent dropdown, and a "minimum cases per million" range slider — all applied together, with stats and charts recomputing live.
* [x] **Colorblind-safe, validated color palette** with full light/dark mode support; each continent keeps a fixed hue so colors follow the entity, not its rank.
* [x] **Graceful handling of missing data** — countries where recovered/active counts aren't reported fall back to "not reported" instead of showing misleading zeros.
* [x] **Responsive layout** that collapses the sidebar to a top bar on narrow screens.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[Watch the walkthrough](https://drive.google.com/file/d/1FNE5w3IiJD8A_OMVajB4zWFnPJ9xIWDG/view?usp=sharing)

## Notes

Describe any challenges encountered while building the app.

- **Router refactor:** Part 1 held all state in a single `App` component. To add routing I restructured the app into a layout shell (`App`) that fetches the data once and shares it, plus separate `Dashboard` and `CountryDetail` page components — moving the filter state down into `Dashboard` where it belongs.
- **Chart rendering:** Recharts' default entrance animation left charts blank in the initial paint; disabling the animation (`isAnimationActive={false}`) made rendering immediate and deterministic.
- **API data gaps:** The disease.sh API has stopped reporting recovered/active cases for many countries, so the detail view and its case-outcomes chart had to degrade gracefully when those values are zero.

## License

    Copyright [2026] [Yingshu Wang of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
