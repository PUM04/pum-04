/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Menu from './components/Menu';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';
import Example from './components/Example';
// Linting kommer klaga på att Box ligger här, men ligger den högre upp funkar inte webbsidan
import Box from '@mui/material/Box';
import './App.css';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Menu />

        <Box
          sx={{
            alignContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            backgroundColor: 'grey',
          }}
        >
          <GraphComponent />
          <InfoboxComponent />
        </Box>
      </Box>
      <Example />
      <p>Hejsan</p>
    </div>
  );
}

export default App;
