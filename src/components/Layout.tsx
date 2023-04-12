/**
 * @file Contains the layout component.
 */
import React from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import { GraphComponent, InfoboxComponent } from './BaseComponent';

//        ____Layout_____
//       /       |       \
//    Menu     main      Menu________
//    /       /    \        \        \
// items     graph  info   Appbar
//           |      |          |
//        graphs  inforutor  LegendBar
//
/**
 * Basestructure for the website
 *
 * @returns the layout of the website
 */
function Layout() {
  const sites = [
    { name: 'first', color: 'red', enabled: true },
    { name: 'second', color: 'blue', enabled: true },
    { name: 'third', color: 'orange', enabled: true },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Menu sites={sites} />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          backgroundColor: 'primary.light1',
        }}
      >
        <GraphComponent />
        <InfoboxComponent />
      </Box>
    </Box>
  );
}

export default Layout;
