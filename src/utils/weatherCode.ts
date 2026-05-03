export function getWeatherInfo(code: number) {
  const map: Record<number, { label: string; icon: string }> = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    61: { label: "Light rain", icon: "🌧️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
  };

  return map[code] ?? { label: "Unknown", icon: "❓" };
}