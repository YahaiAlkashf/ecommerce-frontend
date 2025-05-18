'use client';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      className="p-2 border rounded"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle {theme}
    </button>
  );
};

export default ThemeToggle;
