/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Menu from './components/Menu';
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
        <CssBaseline />
          <Menu />
          <Box
            sx={{
              flexDirection: 'column',
              display: 'inline-flex',
              backgroundColor: 'grey',
            }}
          >
            <GraphComponent />
            <InfoboxComponent />
          </Box>
          <Example />
          <p>Hejsan</p>        
        </Box>
    </div>
  );
}

export default App;
