/**
 * @file Contains the layout component.
 */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import { InfoboxContainer } from './BaseComponent';
import ViewTabs from './ViewTabs';
import { Site } from './SiteInterface';

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
  const [siteProps, setSiteProps] = useState<Map<string, Site>>(map);
  const [metricProps, setMetricProps] = useState<string[]>([]);

  return (
    <Box>
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
      </Box>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'inline-flex',
          marginTop: `0vh`,
          textAlign: 'left',
          minWidth: '70vw', // Should be dependant on navbarwidth.
          minHeight: '46vw',
          margin: '0',
          paddingTop: '10px',
          paddingLeft: '18vw',
          paddingRight: '18vw',
        }}
      >
        <ViewTabs
          siteProps={siteProps}
          metricProps={metricProps}
          fileHandler={fileHandler}
        />

        <InfoboxContainer siteProps={siteProps} fileHandler={fileHandler} />
      </Box>
    </Box>
  );
}

export default Layout;
