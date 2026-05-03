import type { City } from "../../data/cities";
import styles from "./CitySearch.module.scss";

type Props = {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
};

export function CitySearch({ cities, selectedCity, onCityChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="city">Choose city</label>
      <select
        id="city"
        value={selectedCity.name}
        onChange={(event) => {
          const city = cities.find((c) => c.name === event.target.value);
          if (city) onCityChange(city);
        }}
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}, {city.country}
          </option>
        ))}
      </select>
    </div>
  );
}