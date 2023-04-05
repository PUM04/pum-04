/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Menu from './components/Menu';
import Box from '@mui/material/Box';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';
import Example from './components/example';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
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
              flexDirection: 'column',
              display: 'inline-flex',
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
