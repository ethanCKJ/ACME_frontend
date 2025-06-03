import { ThemeOptions } from '@mui/material/styles';
// https://zenoo.github.io/mui-theme-creator/
// const themeOrange =
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f85e00',
      light: '#F97E33',
      dark: '#AD4100',

    },
    secondary: {
      main: '#a41623',
    },
  },
  typography: {
    h1: {
        fontFamily: 'Lora serif'
    },
    h2: {
        fontFamily: 'Lora serif'
    },
    h3: {
        fontFamily: 'Lora serif'
    },
    h4: {
        fontFamily: 'Lora serif'
    },
    h5: {
        fontFamily: 'Lora serif'
    },
    h6: {
        fontFamily: 'Lora serif'
    },
  }
};