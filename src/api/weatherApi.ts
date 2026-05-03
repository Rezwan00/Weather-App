import type { City } from "../data/cities";

export type TemperatureUnit = "celsius" | "fahrenheit";

export type WeatherResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
     weather_code: number[];
  };
};

export async function fetchWeather(
  city: City,
  temperatureUnit: TemperatureUnit
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "auto",
    temperature_unit: temperatureUnit,
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}