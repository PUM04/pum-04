/**
 * @file Contains legendBar and legends
 */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import Paper from '@mui/material/Paper';

/**
 * Creates a legend
 *
 * @param prop legend
 * @param prop.name site name
 * @param prop.color color of legend
 * @returns a legend, colored square with text
 */
function Legend(prop: { name: any; color: any }) {
  const { name, color } = prop;
  return (
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
          bgcolor: color,
          marginTop: '3px',
        }}
      />
      <Typography>{name}</Typography>
    </Box>
  );
}

/**
 * Creates a box for the appbar containg all legends
 *
 * @param props contains list of sites
 * @param props.sites list of sites
 * @returns a box containing all legends
 */
function LegendBar(props: {
  sites: { enabled: any; name: any; color: any }[];
}) {
  const { sites } = props;
  return (
    <Box
      data-testid="legendBar-component"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '8px',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {sites.map((site: { enabled: any; name: any; color: any }) => {
        if (site.enabled)
          return <Legend key={site.name} name={site.name} color={site.color} />;
      })}
    </Box>
  );
}

export default LegendBar;
