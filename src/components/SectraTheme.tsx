import { createTheme } from '@mui/material/styles';

export default function createSectraTheme() {
  return createTheme({
    palette: {
      primary: {
        light: '#DEE8FA',
        main: '#AECDEB',
        dark: '#004688',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
}
