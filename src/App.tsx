import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cities } from "./data/cities";
import { fetchWeather, type TemperatureUnit } from "./api/weatherApi";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { ForecastList } from "./components/ForecastList/ForecastList";
import { WeatherBackground } from "./components/WeatherBackground/WeatherBackground";
import { getWeatherTheme } from "./utils/weatherBackground";
import styles from "./App.module.scss";
import { WeatherOverview } from "./components/WeatherOverview/WeatherOverview";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", selectedCity.name, unit],
    queryFn: () => fetchWeather(selectedCity, unit),
  });

const theme = getWeatherTheme(
  data?.current?.weather_code ?? 0,
  (data?.current?.is_day ?? 1) === 1
);

return (
  <WeatherBackground theme={theme}>
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>Weather Forecast</h1>
        <span>Powered by Open-Meteo</span>
      </div>
      <div className={styles.controls}>
        <CitySearch
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <div className={styles.toggle}>
          <button onClick={() => setUnit("celsius")} disabled={unit === "celsius"}>°C</button>
          <button onClick={() => setUnit("fahrenheit")} disabled={unit === "fahrenheit"}>°F</button>
        </div>
      </div>
    </header>

    <main className={styles.page}>
      {isLoading && <p>Loading weather...</p>}

      {isError && (
        <p className={styles.error}>{(error as Error).message}</p>
      )}

      {data && (
  <>
    <WeatherOverview
      city={selectedCity}
      weather={data.current}
      daily={data.daily}
      unit={unit}
    />
    <ForecastList daily={data.daily} unit={unit} />
  </>
)}
    </main>
  </WeatherBackground>
);
}