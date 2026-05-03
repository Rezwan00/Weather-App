export type City = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export const cities: City[] = [
  { name: "Helsinki", country: "Finland", latitude: 60.1699, longitude: 24.9384 },
  { name: "London", country: "UK", latitude: 51.5072, longitude: -0.1276 },
  { name: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.405 },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
  { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.006 },
];