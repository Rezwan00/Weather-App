import type { City } from "../../data/cities";
import type { TemperatureUnit } from "../../api/weatherApi";
import styles from "./WeatherCard.module.scss";

type Props = {
  city: City;
  weather: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  unit: TemperatureUnit;
};

export function WeatherCard({ city, weather, unit }: Props) {
  return (
    <section className={styles.card}>
      <h2>{city.name}</h2>
      <p className={styles.temperature}>
        {Math.round(weather.temperature_2m)}°{unit === "celsius" ? "C" : "F"}
      </p>
      <p>Wind: {weather.wind_speed_10m} km/h</p>
      <p>Weather code: {weather.weather_code}</p>
    </section>
  );
}