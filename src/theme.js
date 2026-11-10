import React, { createContext, useContext, useState } from 'react';

// Exact color tokens extracted from Food Ordering App Sketch design
export const colors = {
  primary: '#FF705B',        // Signature Coral / Orange
  primaryDark: '#F15A24',    // Deep Coral
  primarySoft: '#FFF0EE',    // Tinted background
  secondary: '#48D2A0',      // Mint Green (Veg / Success)
  dark: '#232D33',           // Primary dark text
  slate: '#303E48',          // Secondary dark text
  gray: '#8C98A4',           // Muted captions & icons
  lightGray: '#E6EAEF',      // Borders & dividers
  background: '#F6F9FC',     // Clean canvas
  card: '#FFFFFF',           // Card surface
  warning: '#FFA64D',        // Star rating / alert
  danger: '#EF4444',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const palettes = {
  light: {
    bg: '#F6F9FC',
    card: '#FFFFFF',
    text: '#232D33',
    subText: '#8C98A4',
    border: '#E6EAEF',
    navBg: '#FFFFFF',
  },
  dark: {
    bg: '#161C20',
    card: '#232D33',
    text: '#FFFFFF',
    subText: '#8C98A4',
    border: '#303E48',
    navBg: '#1B2329',
  },
};

const ThemeContext = createContext({
  theme: palettes.light,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? palettes.dark : palettes.light;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
