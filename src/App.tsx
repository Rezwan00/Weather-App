import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cities } from "./data/cities";
import { fetchWeather, type TemperatureUnit } from "./api/weatherApi";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import { ForecastList } from "./components/ForecastList/ForecastList";
import styles from "./App.module.scss";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", selectedCity.name, unit],
    queryFn: () => fetchWeather(selectedCity, unit),
  });

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Weather Forecast</h1>
        <p>Search weather by city and view the 7-day forecast.</p>
      </section>

      <CitySearch
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <div className={styles.toggle}>
        <button onClick={() => setUnit("celsius")} disabled={unit === "celsius"}>
          °C
        </button>
        <button onClick={() => setUnit("fahrenheit")} disabled={unit === "fahrenheit"}>
          °F
        </button>
      </div>

      {isLoading && <p>Loading weather...</p>}

      {isError && (
        <p className={styles.error}>
          {(error as Error).message}
        </p>
      )}

      {data && (
        <>
          <WeatherCard city={selectedCity} weather={data.current} unit={unit} />
          <ForecastList daily={data.daily} unit={unit} />
        </>
      )}
    </main>
  );
}