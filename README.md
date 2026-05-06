# Weather App

A responsive weather dashboard built with React and TypeScript, powered by the [Open-Meteo API](https://open-meteo.com/). Features a dynamic animated background that changes based on live weather conditions.

**Live Demo:** [weather-app-ruby-five.vercel.app](https://weather-app-ruby-five.vercel.app)

---

## Features

- City search with custom autocomplete dropdown and match highlighting
- Current weather with temperature, wind speed, and condition
- 7-day temperature trend chart (high / low)
- 7-day forecast with weather icons and daily stats
- Celsius / Fahrenheit toggle
- Dynamic animated background — sky, clouds, rain, snow, stars and lightning based on live weather code
- TanStack Query for data fetching and caching
- Sass CSS Modules with frosted glass UI
- CI/CD pipeline via GitHub Actions and Vercel

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Sass CSS Modules |
| Data fetching | TanStack Query |
| Charts | Recharts |
| Testing | Vitest |
| API | Open-Meteo |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js **v22 or higher**
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rezwan00/Weather-App.git
cd Weather-App

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |

---

## CI/CD

Every push to `main` triggers a GitHub Actions workflow that runs lint, tests, and build. Passing builds are automatically deployed to Vercel.

![CI](https://github.com/Rezwan00/Weather-App/actions/workflows/ci.yml/badge.svg)

---

## API

This project uses the free [Open-Meteo API](https://open-meteo.com/) — no API key required.

Weather data is fetched from:
https://api.open-meteo.com/v1/forecast 

Parameters used: `temperature_2m`, `wind_speed_10m`, `weather_code`, `is_day`, `temperature_2m_max`, `temperature_2m_min`.