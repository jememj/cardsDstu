import React from 'react';
import { useStoreon } from 'storeon/react';
import { ThemeProvider } from 'styled-components';

const lightTheme = {
  colors: {
    black: '#121214',
    green: '#6AC08D',
    white: '#FFFFFF',
    gray: '#C7C7C7',
    cardBg: '#FFFFFF',
    cardBgHover: 'rgba(255, 255, 255, 0.5)',
    tooltipBg: '#121214',
    text: '#121214',
    background: '#F7F7F7',
  },
  font: 'sans-serif',
  fontSizes: {
    small: '16px',
    medium: '20px',
    large: '26px',
  },
};

const darkTheme = {
  colors: {
    black: '#121214',
    green: '#6AC08D',
    white: '#FFFFFF',
    gray: '#C7C7C7',
    cardBg: '#282C31',
    cardBgHover: 'rgba(255, 255, 255, 0.1)',
    tooltipBg: 'rgba(255, 255, 255, 0.1)',
    text: '#F7F7F7',
    background: '#212427',
  },
  font: 'sans-serif',
  fontSizes: {
    small: '16px',
    medium: '20px',
    large: '26px',
  },
};

const Theme = ({ children }) => {
  const { theme } = useStoreon('theme');
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
  );
};

export default Theme;
