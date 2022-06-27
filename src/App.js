import React from 'react';
import Header from './components/Header.js'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dropper from './components/Dropper.js';

function App() {
  let theme = createTheme({
    typography:
    {
      allVariants: {
        fontFamily: "Nunito"
      }

    },
    palette: {
      primary: {
        main: '#B31B1B',
      },
      secondary: {
        main: '#ab003c',
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Dropper></Dropper>
    </ThemeProvider>
  );
}

export default App;
