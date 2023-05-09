/**
 * @file Contains the layout component.
 */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import { InfoboxContainer } from './BaseComponent';
import ViewTabs from './ViewTabs';
import { Site } from './SiteInterface';
import { FileHandler } from './FileHandler';

//        ____Layout_____
//       /       |       \
//    Menu     main      Menu________
//    /       /    \        \        \
// items     graph  info   Appbar
//           |      |          |
//        graphs  inforutor  LegendBar
//

interface MenuProps {
  fileHandler: FileHandler;
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
  const [siteProps, setSiteProps] = useState<Map<string, Site>>(map);
  const [metricProps, setMetricProps] = useState<string[]>([]);

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
        setMetricProps={setMetricProps}
      />

      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          marginTop: `60px`,
          textAlign: 'left',
          margin: '0',
        }}
      >
        <ViewTabs
          siteProps={siteProps}
          metricProps={metricProps}
          fileHandler={fileHandler}
        />
        <InfoboxContainer fileHandler={fileHandler} />
      </Box>
    </Box>
  );
}

export default Layout;
