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
  fileHandler: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * This is a description
 *
 * @param props is something
 * @returns something
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
 * This is a description
 *
 * @param props contains props
 * @returns tabs containing graphs
 */
function ViewTabs(props: ViewTabsProps) {
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
