/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';
import { Site } from './SiteInterface';

interface GraphComponentProps {
  siteProps: Map<string, Site>;
  fileHandler: any;
  metrics: string[];
}
/**
 * Component that contains all graphs
 *
 * @param props contains fileHandler siteprops with siteId as key and SiteProperties as value
 * @returns MUI box component
 */
export function GraphComponent(props: GraphComponentProps): JSX.Element {
  const { fileHandler, siteProps, metrics } = props;

  const getSiteIds = (): string[] =>
    Array.from(siteProps.keys()).filter((key) => siteProps.get(key)?.enabled);

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
          metrics={metrics}
          sites={getSiteIds()}
          fileHandler={fileHandler}
          siteProps={siteProps}
        />{' '}
      </Box>
      <Box>
        {' '}
        <BoxPlotChart
          metrics={metrics}
          sites={getSiteIds()}
          fileHandler={fileHandler}
          siteProps={siteProps}
        />{' '}
      </Box>
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
    </Box>
  );
}
