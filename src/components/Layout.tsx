/**
 * @file Contains the layout component.
 */
import React from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import ViewTabs from './ViewTab';

import { InfoboxComponent } from './BaseComponent';

//        ____Layout_____
//       /       |       \
//    Menu     main      Menu________
//    /       /    \        \        \
// items     graph  info   Appbar
//           |      |          |
//        graphs  inforutor  LegendBar
//

interface MenuProps {
  // TODO: Get the actual type
  fileHandler: any;
}

/**
 * Basestructure for the website
 *
 * @param props contains filehandler
 * @returns the layout of the website
 */
function Layout(props: MenuProps) {
  const { fileHandler } = props;

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Menu fileHandler={fileHandler} />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          backgroundColor: 'primary.light2',
        }}
      >
        <ViewTabs />
        <InfoboxComponent />
      </Box>
    </Box>
  );
}

export default Layout;
