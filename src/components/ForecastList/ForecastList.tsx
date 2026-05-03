import type { TemperatureUnit } from "../../api/weatherApi";
import  { getWeatherInfo } from "../../utils/weatherCode";
import styles from "./ForecastList.module.scss";

type Props = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  unit: TemperatureUnit;
};

export function ForecastList({ daily, unit }: Props) {
  return (
    <section className={styles.grid}>
     {daily.time.map((date, index) => {
  const weatherInfo = getWeatherInfo(daily.weather_code[index]);

  return (
    <article key={date} className={styles.day}>
      <h3>{new Date(date).toLocaleDateString()}</h3>

      <div className={styles.icon}>{weatherInfo.icon}</div>

      <p>{weatherInfo.label}</p>
      <p>Max: {Math.round(daily.temperature_2m_max[index])}°{unit === "celsius" ? "C" : "F"}</p>
      <p>Min: {Math.round(daily.temperature_2m_min[index])}°{unit === "celsius" ? "C" : "F"}</p>
    </article>
  );
})}
    </section>
  );
}