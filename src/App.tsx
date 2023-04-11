/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Box from '@mui/material/Box';
import Menu from './components/Menu';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';
import Example from './components/Example';
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
