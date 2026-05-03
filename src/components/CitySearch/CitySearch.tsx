import type { City } from "../../data/cities";
import styles from "./CitySearch.module.scss";

type Props = {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
};

export function CitySearch({ cities, selectedCity, onCityChange }: Props) {
  const handleChange = (value: string) => {
    const city = cities.find(
      (city) =>
        `${city.name}, ${city.country}`.toLowerCase() === value.toLowerCase()
    );

    if (city) {
      onCityChange(city);
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="city">Search city</label>

      <input
        id="city"
        list="city-options"
        defaultValue={`${selectedCity.name}, ${selectedCity.country}`}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Type or choose a city"
      />

      <datalist id="city-options">
        {cities.map((city) => (
          <option
            key={city.name}
            value={`${city.name}, ${city.country}`}
          />
        ))}
      </datalist>
    </div>
  );
}