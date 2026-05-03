export type WeatherTheme =
  | 'clear-day'
  | 'clear-night'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'thunderstorm'
  | 'foggy';

export function getWeatherTheme(
  weatherCode: number,
  isDay: boolean
): WeatherTheme {
  if (weatherCode === 0 || weatherCode === 1)
    return isDay ? 'clear-day' : 'clear-night';
  if (weatherCode <= 3) return 'cloudy';
  if (weatherCode <= 49) return 'foggy';
  if (weatherCode <= 67) return 'rainy';
  if (weatherCode <= 77) return 'snowy';
  if (weatherCode <= 82) return 'rainy';
  if (weatherCode <= 86) return 'snowy';
  return 'thunderstorm'; // 95–99
}