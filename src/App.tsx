/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
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
    <Box sx={{ flexDirection: 'column', display: 'inline-flex' }}>
      <div
        style={{
          margin: '5%',
          maxWidth: '100vw',
        }}
      />
      <GraphComponent />
      <InfoboxComponent />
      <div />
    </Box>
  );
}

export default App;
