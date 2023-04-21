/**
 * @file Contains the layout component.
 */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import { GraphComponent, InfoboxComponent } from './BaseComponent';
import { SiteProperties } from './SitePropetiesInterface';

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

/**
 * Layout component that contains the menu, infobox and the graphs
 *
 * @param props contains filehandler and siteProps
 * @returns MUI box component with the layout of the website.
 */
function Layout(props: MenuProps) {
  const { fileHandler } = props;
  const map = new Map();
  // Maps each site key to a site name and a color
  const [siteProps, setSiteProps] = useState<Map<string, SiteProperties>>(map);
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Menu
        fileHandler={fileHandler}
        siteProps={siteProps}
        setSiteProps={setSiteProps}
      />

      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          backgroundColor: 'primary.light1',
        }}
      >
        <GraphComponent siteProps={siteProps} fileHandler={fileHandler} />
        <InfoboxComponent />
      </Box>
    </Box>
  );
}

export default Layout;
