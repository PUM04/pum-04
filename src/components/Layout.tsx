/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
// import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Menu from './Menu';
// import Legend from './Legends';
// import { GraphComponent, InfoboxComponent } from './BaseComponent';

//        ____Layout_____
//       /       |       \
//    Menu     main      Menu________
//    /       /    \        \        \
// items     graph  info   Appbar    
//           |      |          |
//        graphs  inforutor  LegendBar
//
const Layout = () => {


  
  const sites = [
    {name: 'first', color: 'red', enabled: true},
    {name: 'second', color: 'blue', enabled: true},
    {name: 'third', color: 'orange', enabled: true},
  ];


  return( 
    <Box
      sx={{
        display: 'flex',
      }}
    >
      {/* <Menu sites={sites} /> */}
      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          backgroundColor: 'primary.light1',
          // gap: '10px',
        }}
      >
        {/* <GraphComponent /> */}
        {/* <InfoboxComponent /> */}
      </Box>
    </Box>
  );
};

export default Layout;
