/**
 * @file Contains the layout component.
 */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { FloodRounded } from '@mui/icons-material';
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
 *
 * @param props
 */
function Layout(props: MenuProps) {
  const { fileHandler } = props;
  const map = new Map();
  const [siteProps, setSiteProps] = useState<Map<string, SiteProperties>>(map);
  const PHI = (1 + Math.sqrt(5)) / 2;
  const n1 = 5 * PHI - Math.floor(5 * PHI);
  const n2 = 10 * PHI - Math.floor(10 * PHI);
  const n3 = 15 * PHI - Math.floor(15 * PHI);
  const n4 = 20 * PHI - Math.floor(20 * PHI);
  const n5 = 100 * PHI - Math.floor(100 * PHI);

  map.set('stockholm', {
    color: `#0${Math.floor(n1 * 19996).toString(16)}`,
    enabled: true,
  });
  map.set('manchester', {
    color: `#0${Math.floor(n2 * 1337).toString(16)}`,
    enabled: true,
  });
  map.set('tokyo', {
    color: `#0${Math.floor(n3 * 8888).toString(16)}`,
    enabled: true,
  });
  map.set('linköping', {
    color: 'red',
    enabled: true,
  });
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
      <Button
        color="primary"
        type="button"
        onClick={() => {
          const testmap = new Map<string, SiteProperties>();
          testmap.set('stockholm', { color: 'red', enabled: true });
          testmap.set('manchester', { color: 'red', enabled: true });
          testmap.set('tokyo', { color: 'black', enabled: true });
          testmap.set('linköping', { color: 'grey', enabled: true });
          testmap.set('a;skld', { color: 'grey', enabled: false });
          setSiteProps(testmap);
          console.log(siteProps);
        }}
      />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          backgroundColor: 'primary.light1',
        }}
      >
        <GraphComponent siteProps={siteProps} />
        <InfoboxComponent />
      </Box>
    </Box>
  );
}

export default Layout;
