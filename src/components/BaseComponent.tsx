/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';
import { SiteProperties } from './SitePropetiesInterface';

interface GraphComponentProps {
  metrics: Array<string>;
  sites: Array<string>;
  siteProps: Map<string, SiteProperties>;
  fileHandler: any;
}
/**
 * Component that contains all Box graphs
 *
 * @param props contains fileHandler siteprops with siteId as key and SiteProperties as value
 * @returns MUI box component
 */
export function BoxGraphComponent(props: GraphComponentProps): JSX.Element {
  const { metrics } = props;
  const { sites } = props;
  const { siteProps } = props;
  const { fileHandler } = props;

  return (
    <Box
      data-testid="boxgraph-component"
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
        <BoxPlotChart
          metrics={metrics}
          sites={sites}
          siteProps={siteProps}
          fileHandler={fileHandler}
        />{' '}
      </Box>
    </Box>
  );
}

/**
 * Component that contains all bar graphs
 *
 * @param props contains metrics, sites and filehandler
 * @returns MUI box component
 */
export function BarGraphComponent(props: GraphComponentProps): JSX.Element {
  const { metrics, sites, siteProps, fileHandler } = props;
  return (
    <Box
      data-testid="bargraph-component"
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
          metrics={metrics}
          sites={sites}
          siteProps={siteProps}
          fileHandler={fileHandler}
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
