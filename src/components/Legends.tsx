import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import React from 'react';
import Paper from '@mui/material/Paper';
/**
 * Creates a box for the appbar containg all legends
 * @param props list of sites
 * @returns a box containing all legends
 *
 */
function LegendBar(props: {
  sites: { enabled: any; name: any; color: any }[];
}) {
  return (
    <Box
      data-testid="legends-component"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '8px',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {props.sites.map((site: { enabled: any; name: any; color: any }) => {
        if (site.enabled)
          return <Legend key={site.name} name={site.name} color={site.color} />;
      })}
    </Box>
  );
}
/**
 * Creates a legend
 * @param prop name and color for legend
 * @returns a legend, colored square with text
 */
const Legend = (prop: { name: any; color: any }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    }}
  >
    <Paper
      data-testid="legend-component"
      sx={{
        width: '15px',
        height: '15px',
        bgcolor: prop.color,
        marginTop: '3px',
      }}
    />
    <Typography>{prop.name}</Typography>
  </Box>
);

export default LegendBar;
