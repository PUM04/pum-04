/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from './Menu';
import Legend from './Legends';
import { GraphComponent, InfoboxComponent } from './BaseComponent';

//        ____Layout_____
//       /       |       \
//    Menu     main      appbar
//    /       /    \          \
// items     graph  info     legends
//           |      |
//        graphs  inforutor
//
const Layout = () => {


  
  const sites = [
    {name: 'first', color: 'red', enabled: true},
    {name: 'second', color: 'blue', enabled: true},
    {name: 'third', color: 'orange', enabled: true},
  ];

  // const testLegend = (id: number) => {
  //   setSites(prevSites => {
  //     const newSites: { name: string; color: string; id: number; enabled: boolean; }[] = [];
  //     prevSites.forEach(site => {
  //       if (site.id === id) site.enabled = !site.enabled;
  //       newSites.push(site);
  //     });
  //     return newSites;
  //   })
  // };

  return( 
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Menu sites={sites} />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          backgroundColor: '#242424',
          gap: '10px',
        }}
      >
        <Toolbar /*pushes down the main content, not dynamic though*/ 
        />
        {/* <Button onClick={() => testLegend(2)} variant="contained">Try me</Button> */}
        <GraphComponent />
        <InfoboxComponent />
      </Box>
    </Box>
  );
};

export default Layout;
