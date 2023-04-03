/**
 * @file Contains the App top level component.
 */
import React from 'react';
import Box from '@mui/material/Box';
import './App.css';
import { GraphComponent, InfoboxComponent } from './components/basecomponent';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="grid-container">
      meny? kan ta bort
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
    </div>
  );
}

export default App;
