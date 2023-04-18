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

import { BoxGraphComponent, BarGraphComponent } from './BaseComponent';

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

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
}));

/**
 * This is a description
 *
 * @returns tabs containing graphs
 */
function ViewTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', paddingTop: '5.5vh' }}>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            hidden: true,
          }}
          sx={{
            '& button': {
              borderRadius: 1,
              color: 'primary.dark3',
              textTransform: 'none',
              fontSize: 17,
              marginRight: 0.05,
              backgroundColor: 'primary.light4',
            },
            '& button.Mui-selected': {
              boxShadow: 10,
              backgroundColor: 'primary.light2',
              color: 'primary.dark1',
            },
            '& button:hover': {
              backgroundColor: 'primary.light1',
            },
            '& button:active': {
              backgroundColor: 'primary.light1',
              color: 'primary.light2',
            },
          }}
        >
          <StyledTab label="Bar" />
          <StyledTab label="Box" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BarGraphComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BoxGraphComponent />
      </TabPanel>
    </Box>
  );
}

export default ViewTab;
