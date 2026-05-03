import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TemperatureUnit } from "../../api/weatherApi";
import styles from "./TemperatureChart.module.scss";

type Props = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  unit: TemperatureUnit;
};

export function TemperatureChart({ daily, unit }: Props) {
  const data = daily.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString(undefined, {
      weekday: "short",
    }),
    max: Math.round(daily.temperature_2m_max[index]),
    min: Math.round(daily.temperature_2m_min[index]),
  }));

  return (
    <section className={styles.card}>
      <h2>7-Day Temperature Trend</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis unit={unit === "celsius" ? "°C" : "°F"} />
          <Tooltip />
          <Line type="monotone" dataKey="max" strokeWidth={3} />
          <Line type="monotone" dataKey="min" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}