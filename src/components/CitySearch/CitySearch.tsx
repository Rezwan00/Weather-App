import { useState, useRef, useEffect } from "react";
import type { City } from "../../data/cities";
import styles from "./CitySearch.module.scss";

type Props = {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
};

export function CitySearch({ cities, selectedCity, onCityChange }: Props) {
  const [query, setQuery] = useState(`${selectedCity.name}, ${selectedCity.country}`);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = cities.filter((c) =>
    `${c.name}, ${c.country}`.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    const item = listRef.current?.children[highlighted] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  function selectCity(city: City) {
    onCityChange(city);
    setQuery(`${city.name}, ${city.country}`);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered[highlighted]) {
      selectCity(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>

      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setHighlighted(0); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        autoComplete="off"
        className={styles.input}
      />

      {open && filtered.length > 0 && (
        <ul className={styles.dropdown} ref={listRef} role="listbox">
          {filtered.map((city, i) => {
            const label = `${city.name}, ${city.country}`;
            const match = label.toLowerCase().indexOf(query.toLowerCase());
            return (
              <li
                key={city.name}
                role="option"
                aria-selected={i === highlighted}
                className={`${styles.option} ${i === highlighted ? styles.active : ""}`}
                onMouseDown={() => selectCity(city)}
                onMouseEnter={() => setHighlighted(i)}
              >
                {match >= 0 && query.length > 0 ? (
                  <>
                    {label.slice(0, match)}
                    <strong>{label.slice(match, match + query.length)}</strong>
                    {label.slice(match + query.length)}
                  </>
                ) : label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}