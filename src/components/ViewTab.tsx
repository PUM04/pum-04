/**
 * @file Contains the
 */
import React from 'react';
import '../App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

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
        <Box sx={{ p: 2 }}>
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

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'primary.light2',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: 'primary.light2',
  }
}));

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
    <Box sx={{ width: '100%', paddingTop: '6vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light1' }}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Bar" {...a11yProps(0)} />
          <StyledTab label="Box" {...a11yProps(1)} />
        </StyledTabs>
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
