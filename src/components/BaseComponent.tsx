/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';

/**
 * Component that contains all graphs
 *
 * @returns MUI box component
 */
export function GraphComponent(): JSX.Element {
  return (
    <Box
      data-testid="graph-component"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        paddingTop: '0vh',
        paddingBottom: '3vh',
        backgroundColor: 'primary.light2',
        '&:hover': {
          backgroundColor: 'primary.light2',
        },
      }}
    >
      <Box>
        {' '}
        <BarChart
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
        />{' '}
      </Box>
      <Box>
        {' '}
        <BoxPlotChart
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping']}
        />{' '}
      </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
      <Box> Put graphs here! </Box>
    </Box>
  );
}

/**
 * Component that contains all infoboxes
 *
 * @returns MUI box component
 */
export function InfoboxComponent(): JSX.Element {
  return (
    <Box
      data-testid="infobox-component"
      sx={{
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: 'primary.main',
        flexWrap: 'wrap',
        color: 'secondary.main',
        justifyContent: 'space-evenly',
        '&:hover': {
          backgroundColor: 'primary.light1',
          color: 'primary.dark',
        },
      }}
    >
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
      <Box>Put infoboxes here! </Box>
    </Box>
  );
}
