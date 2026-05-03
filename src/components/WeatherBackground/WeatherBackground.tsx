import { useEffect, useRef } from 'react';
import styles from './WeatherBackground.module.scss';
import type { WeatherTheme } from '../../utils/weatherBackground';

interface Props {
  theme: WeatherTheme;
  children: React.ReactNode;
}

export function WeatherBackground({ theme, children }: Props) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;
    el.innerHTML = '';

    // Always render 3 clouds
    for (let i = 0; i < 3; i++) {
      const c = document.createElement('div');
      c.className = styles.cloud;
      el.appendChild(c);
    }

    if (theme === 'rainy' || theme === 'thunderstorm') {
      for (let i = 0; i < 70; i++) {
        const d = document.createElement('div');
        d.className = styles.raindrop;
        d.style.left = `${Math.random() * 100}%`;
        d.style.height = `${14 + Math.random() * 12}px`;
        d.style.animationDuration = `${0.35 + Math.random() * 0.35}s`;
        d.style.animationDelay = `${Math.random() * 1.5}s`;
        el.appendChild(d);
      }
    }

    if (theme === 'snowy') {
      for (let i = 0; i < 50; i++) {
        const f = document.createElement('div');
        f.className = styles.snowflake;
        const size = 3 + Math.random() * 5;
        f.style.width = f.style.height = `${size}px`;
        f.style.left = `${Math.random() * 100}%`;
        f.style.animationDuration = `${3 + Math.random() * 5}s`;
        f.style.animationDelay = `${Math.random() * 5}s`;
        el.appendChild(f);
      }
    }

    if (theme === 'clear-night') {
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.className = styles.star;
        const size = 1 + Math.random() * 2;
        s.style.width = s.style.height = `${size}px`;
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 65}%`;
        s.style.animationDuration = `${1.5 + Math.random() * 2.5}s`;
        s.style.animationDelay = `${Math.random() * 2}s`;
        el.appendChild(s);
      }
    }

    if (theme === 'thunderstorm') {
      const l = document.createElement('div');
      l.className = styles.lightning;
      el.appendChild(l);
    }
  }, [theme]);

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div ref={particlesRef} className={styles.particles} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}