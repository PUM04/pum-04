/**
 * @file
 */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

// Extend the theme type to include our custom color

declare module '@mui/material/styles' {
  interface PaletteOptions {
    gray?: SimplePaletteColorOptions;
  }

  interface PaletteColor {
    light1?: string;
    light2?: string;
    light3?: string;
    light4?: string;
    link?: string;
  }

  interface SimplePaletteColorOptions {
    light1?: string;
    light2?: string;
    light3?: string;
    light4?: string;
    link?: string;
  }
}

/**
 * Create a theme from the .mui-theme element in the DOM
 *
 * @param props - props to pass to the ThemeProvider component that is returned from this function call (children)
 * @returns ThemeProvider component with a theme created from the .mui-theme element in the DOM
 */
export default function CreateSectraTheme(props: any): JSX.Element {
  const { children } = props;
  const muiTheme = document.querySelector('.mui-theme');
  console.log('tja');
  if (!muiTheme) {
    const theme = createTheme({
      palette: {
        primary: {
          light: '#DEE8FA',
          main: '#AECDEB',
          dark: '#004688',
        },
        secondary: {
          main: '#FF7B30',
        },
      },
    });
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  // Get styles from .mui-theme and create a theme from them to pass to the ThemeProvider
  const style = getComputedStyle(muiTheme);

  const theme = createTheme({
    palette: {
      primary: {
        light: style.getPropertyValue('--primary-light'),
        main: style.getPropertyValue('--primary-main'),
        dark: style.getPropertyValue('--primary-dark'),
        light1: style.getPropertyValue('--primary-light1'),
        light2: style.getPropertyValue('--primary-light2'),
        light3: style.getPropertyValue('--primary-light3'),
        light4: style.getPropertyValue('--primary-light4'),
      },
      secondary: {
        main: style.getPropertyValue('--secondary-main'),
      },
      gray: { main: style.getPropertyValue('--gray-main') },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
