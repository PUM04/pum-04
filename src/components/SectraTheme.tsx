import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

/**
 * this is a thinkg
 */

/**
 *
 * @param rgbColor
 */
function convertToHex(rgbColor: string): string {
  const hexcolor = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!hexcolor) {
    return '#000000';
  }

  return `#${hexcolor
    .slice(1)
    .map((val) => parseInt(val, 10).toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 *
 */
export default function createSectraTheme(): JSX.Element {
  const muiTheme = document.querySelector('.mui-theme');
  if (!muiTheme) {
    return <ThemeProvider theme={createTheme()} />;
  }

  const style = getComputedStyle(muiTheme);
  const lightProp = style.getPropertyValue('light');
  const mainProp = style.getPropertyValue('main');
  const darkProp = style.getPropertyValue('dark');

  const lightTheme = convertToHex(lightProp);
  const darkTheme = convertToHex(mainProp);
  const mainTheme = convertToHex(darkProp);

  console.log(lightTheme, mainTheme, darkTheme);
  const theme = createTheme({
    palette: {
      primary: {
        light: lightTheme,
        main: mainTheme,
        dark: darkTheme,
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  return <ThemeProvider theme={theme}> </ThemeProvider>;
}
