import React, { createContext, useContext } from 'react';
import { colors, Colors } from './colors';
import { typography, Typography } from './typography';

export interface Theme {
  colors: Colors;
  typography: Typography;
}

const theme: Theme = { colors, typography };

const ThemeContext = createContext<Theme>(theme);

export const useTheme = (): Theme => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export default ThemeProvider;
