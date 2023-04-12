/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Box from '@mui/material/Box';
import SectraTheme from './components/SectraTheme';
import Menu from './components/Menu';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';
import './App.css';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="App mui-theme">
      <SectraTheme>
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
      </SectraTheme>
    </div>
  );
}

export default App;
