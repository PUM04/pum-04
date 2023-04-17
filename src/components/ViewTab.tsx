/**
 * @file Contains the
 */
import React from 'react';
import '../App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
    <Box sx={{ width: '100%', marginTop: '6vh' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}

export default ViewTab;
