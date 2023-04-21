/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';
import InfoBox from './InfoBox';

interface BaseComponentProps {
  fileHandler: any;
}
/**
 * Component that contains all graphs
 *
 * @param props contains fileHandler
 * @returns MUI box component
 */
export function GraphComponent(props: BaseComponentProps): JSX.Element {
  const { fileHandler } = props;

  return (
    <Box
      data-testid="graph-component"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        paddingTop: '7vh',
        paddingBottom: '3vh',
        backgroundColor: 'primary.light2',
        '&:hover': {
          backgroundColor: 'primary.light1',
        },
      }}
    >
      <Box>
        {' '}
        <BarChart
          metrics={['GetPatient', 'GetImageMetadata']}
          sites={[]}
          fileHandler={fileHandler}
        />{' '}
      </Box>
      <Box>
        {' '}
        <BoxPlotChart
          metrics={['GetPatient', 'GetImageMetadata']}
          sites={[]}
          fileHandler={fileHandler}
        />{' '}
      </Box>
      <Box> Put graphs here! </Box>
    </Box>
  );
}

/**
 * Component that contains all infoboxes
 *
 * @param props is filehandler
 * @returns MUI box component
 */
export function InfoboxContainer(props: BaseComponentProps): JSX.Element {
  const { fileHandler } = props;
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
      <InfoBox siteId="4b14a8" fileHandler={fileHandler} />
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
