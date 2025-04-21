import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#4B6BFF',
  secondary: '#4BD0A0',
  accent: '#FF6B4B',
  background: '#FFFFFF',
  card: '#F6F8FA',
  text: '#1A1F36',
  border: '#E1E4E8',
  notification: '#FF3B30',
  placeholder: '#8A94A6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  highlight: '#F0F4FF',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  download: '#4BD0A0',
  progressTrack: '#E1E4E8',
  progressFill: '#4B6BFF',
};

const darkColors = {
  primary: '#6B8AFF',
  secondary: '#5DDEB0',
  accent: '#FF8B6B',
  background: '#121212',
  card: '#1E1E1E',
  text: '#F2F5FA',
  border: '#2C2E33',
  notification: '#FF453A',
  placeholder: '#8A94A6',
  shadow: 'rgba(0, 0, 0, 0.3)',
  highlight: '#1A2246',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  download: '#5DDEB0',
  progressTrack: '#2C2E33',
  progressFill: '#6B8AFF',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');
  
  // Calculate if we should use dark mode
  const isDark = 
    theme === 'system' ? colorScheme === 'dark' : theme === 'dark';
  
  // Get the appropriate colors based on the theme
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};