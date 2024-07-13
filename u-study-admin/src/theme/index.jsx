import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

export default function ThemeProvider({ children }) {
  const memorizeValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: {
        borderRadius: 8,
      },
    }),
    []
  );
  const theme = createTheme(memorizeValue);

  theme.components = overrides(theme);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
