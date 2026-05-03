import type { City } from "../../data/cities";
import type { TemperatureUnit } from "../../api/weatherApi";
import { getWeatherInfo } from "../../utils/weatherCode"
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

  const info = getWeatherInfo(weather.weather_code)
  return (
    <section className={styles.card}>
      <h2>{city.name}</h2>

<div style={{ fontSize: "40px" }}>
  {info.icon}
</div>

<p className={styles.temperature}>
  {Math.round(weather.temperature_2m)}°{unit === "celsius" ? "C" : "F"}
</p>

<p>{info.label}</p>
<p>Wind: {weather.wind_speed_10m} km/h</p>
    </section>
  );
}