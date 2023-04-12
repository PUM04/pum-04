import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import React from 'react';
import Paper from '@mui/material/Paper';
/**
 *
 * @param p
 */
function LegendBar(props: { sites: { enabled: any; name: any; color: any; }[]; }) {
  return (
    <Box
      data-testid='legends-component'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '8px',
        justifyContent: 'center',
        flexGrow: 1
      }}
    >
      {props.sites.map((site: { enabled: any; name: any; color: any;}) => {
        if (site.enabled) return <Legend key={site.name} name={site.name} color={site.color}/>;
      })}
    </Box>
  );
} 

const Legend = (prop: { name: any; color: any; }) => (
  <Box
    // style={enabled ? {height: '0', width: '0'} : {}}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    }}
  >
    <Paper
      data-testid='legend-component'
      sx={{
        width: '15px',
        height: '15px',
        bgcolor: prop.color,
        marginTop: '3px',
      }}
    />
    <Typography >{prop.name}</Typography>
  </Box>
);

export default LegendBar;
