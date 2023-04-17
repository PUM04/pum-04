/**
 * @file Contains the
 */
import React from 'react';
import '../App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { GraphComponent } from './BaseComponent';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

/**
 * This is a description
 *
 * @param props is something
 * @returns something
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

/**
 * This is a description
 *
 * @param index is number
 * @returns your mum
 */
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/**
 * This is a description
 *
 * @returns tabs
 */
function ViewTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', paddingTop: '7vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Bar" {...a11yProps(0)} />
          <Tab label="Box" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GraphComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Hello
      </TabPanel>
    </Box>
  );
}

export default ViewTab;
