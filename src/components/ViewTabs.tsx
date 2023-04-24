/**
 * @file Contains the
 */
import React, { useState } from 'react';
import '../App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

import { BoxGraphComponent, BarGraphComponent } from './BaseComponent';

interface ViewTabsProps {
  metrics: Array<string>;
  sites: Array<string>;
  siteProps: any;
  fileHandler: any;
}

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

/**
 * This is the TabPanel "component". MUI does not have an off the shelf TabPanel to use.
 * This is the given source code by MUI for creating a TabPanel.
 *
 * @param props contains: children components to be rendern within the tabpanel,
 * a value to make sure which child component that should be rendern.
 * and an index to tell the two rendern child components apart.
 * @returns a tabpanel to use in viewtabs.
 */
const TabPanel = styled((props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      data-testid={`tab-panel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2, padding: 0 }}>{children}</Box>}
    </div>
  );
})<TabPanelProps>();

/**
 * This contains the ViewTabs component.
 *
 * @param props contains a filehandler.
 * @returns the ViewTabs component containing graphs.
 */
function ViewTabs(props: ViewTabsProps) {
  const { siteProps } = props;
  const { fileHandler } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'inline-block',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            hidden: true,
          }}
          sx={{
            '& button': {
              boxShadow: 'inset 0 8px 6px -7px',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 2,
              color: 'primary.dark3',
              textTransform: 'none',
              fontSize: 17,
              marginRight: 0.1,
              backgroundColor: 'primary.light4',
            },
            '& button.Mui-selected': {
              boxShadow: '0',
              backgroundColor: 'primary.light2',
              color: 'primary.dark1',
            },
            '& button:hover': {
              backgroundColor: 'primary.light1',
            },
            '& button.Mui-selected:hover': {
              backgroundColor: 'primary.light2',
            },
            '& button:active': {
              backgroundColor: 'primary.light1',
              color: 'primary.light2',
            },
          }}
        >
          <Tab label="Bar" data-testid="bar-tab" />
          <Tab label="Box" data-testid="box-tab" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BarGraphComponent
          sites={['4b14a8']}
          metrics={['GetPatient']}
          siteProps={siteProps}
          fileHandler={fileHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BoxGraphComponent
          sites={['4b14a8']}
          metrics={['GetPatient']}
          fileHandler={fileHandler}
        />
      </TabPanel>
    </Box>
  );
}

export default ViewTabs;
