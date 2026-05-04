import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import type { City } from "../../data/cities";
import type { TemperatureUnit } from "../../api/weatherApi";
import { getWeatherInfo } from "../../utils/weatherCode";
import styles from "./WeatherOverview.module.scss";

type Props = {
  city: City;
  weather: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  unit: TemperatureUnit;
};

export function WeatherOverview({ city, weather, daily, unit }: Props) {
  const info = getWeatherInfo(weather.weather_code);
  const unitLabel = unit === "celsius" ? "°C" : "°F";

  const chartData = daily.time.map((date, i) => ({
    day: new Date(date).toLocaleDateString(undefined, { weekday: "short" }),
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
  }));

  return (
    <section className={styles.card}>
      {/* Left — current conditions */}
      <div className={styles.current}>
        <div className={styles.cityRow}>
          <span className={styles.cityName}>{city.name}</span>
          <span className={styles.country}>{city.country}</span>
        </div>

        <div className={styles.iconTemp}>
          <span className={styles.icon}>{info.icon}</span>
          <span className={styles.temp}>
            {Math.round(weather.temperature_2m)}{unitLabel}
          </span>
        </div>

        <span className={styles.label}>{info.label}</span>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Wind</span>
            <span className={styles.statValue}>{weather.wind_speed_10m} km/h</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statLabel}>High</span>
            <span className={styles.statValue}>
              {Math.round(daily.temperature_2m_max[0])}{unitLabel}
            </span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statLabel}>Low</span>
            <span className={styles.statValue}>
              {Math.round(daily.temperature_2m_min[0])}{unitLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.separator} />

      {/* Right — chart */}
      <div className={styles.chartArea}>
        <span className={styles.chartTitle}>7-Day Temperature Trend</span>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              unit={unitLabel}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15,25,45,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
              }}
              cursor={{ stroke: "rgba(255,255,255,0.2)" }}
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#f97316"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#f97316" }}
              activeDot={{ r: 5 }}
              name="High"
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#60a5fa"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#60a5fa" }}
              activeDot={{ r: 5 }}
              name="Low"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}