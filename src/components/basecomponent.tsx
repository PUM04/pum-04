/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
/**
 * Component that contains all graphs
 *
 * @returns MUI box component
 */
export function GraphComponent(): JSX.Element {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'inline-flex',
        backgroundColor: 'red',
        '&:hover': {
          backgroundColor: 'grey',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
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
      sx={{
        flexDirection: 'row',
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        '&:hover': {
          backgroundColor: 'grey',
          opacity: [0.9, 0.8, 0.7],
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
