import type { TemperatureUnit } from "../../api/weatherApi";
import { getWeatherInfo } from "../../utils/weatherCode";
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

        const weekday = new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
        });

        const formattedDate = new Date(date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
        });

        return (
          <article key={date} className={styles.day}>
            <div className={styles.header}>
              <span className={styles.weekday}>{weekday}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>

            <div className={styles.temps}>
              <span className={styles.max}>
                {Math.round(daily.temperature_2m_max[index])}°
                {unit === "celsius" ? "C" : "F"}
              </span>

              <span className={styles.min}>
                {Math.round(daily.temperature_2m_min[index])}°
                {unit === "celsius" ? "C" : "F"}
              </span>
            </div>

            <div className={styles.icon}>{weatherInfo.icon}</div>

            <p>{weatherInfo.label}</p>
          </article>
        );
      })}
    </section>
  );
}