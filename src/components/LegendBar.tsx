/**
 * @file Contains legendBar and legends
 */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import Paper from '@mui/material/Paper';
import { Site } from './SiteInterface';

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

interface LegendBarProps {
  siteProps: Map<string, Site>;
}
/**
 * Creates a box for the appbar containg all legends
 *
 * @param props contains map of siteKeys and SiteProperties
 * @returns a box containing all legends
 */
function LegendBar(props: LegendBarProps) {
  const { siteProps } = props;

  const legends: Array<JSX.Element> = [];
  siteProps.forEach((siteprop, siteId) => {
    const legendKey = siteId;
    if (siteprop.enabled) {
      legends.push(
        <Legend key={legendKey} name={siteprop.name} color={siteprop.color} />
      );
    }
  });

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
      {legends}
    </Box>
  );
}

export default LegendBar;
