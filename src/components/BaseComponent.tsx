/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';

interface SiteProperties {
  color: string;
  enabled: boolean;
}
interface GraphComponentProps {
  siteProps: Map<string, SiteProperties>;
}
/**
 * Component that contains all graphs
 *
 * @param props
 * @returns MUI box component
 */
export function GraphComponent(props: GraphComponentProps): JSX.Element {
  const { siteProps } = props;
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
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping', 'tokyo', 'manchester']}
          siteProps={siteProps}
        />{' '}
      </Box>
      <Box>
        {' '}
        <BoxPlotChart
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping']}
          siteProps={siteProps}
        />{' '}
      </Box>
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
