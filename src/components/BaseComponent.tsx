/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React from 'react';
import { BoxPlotChart, BarChart } from './Charts';
import InfoBox from './InfoBox';
import { Site } from './SiteInterface';

interface GraphComponentProps {
  metrics: Array<string>;
  siteProps: Map<string, Site>;
  fileHandler: any;
}

interface InfoContainerProps {
  // sites: Array<string>;
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
  const { siteProps } = props;
  const { fileHandler } = props;

  const getSiteIds = (): string[] =>
    Array.from(siteProps.keys()).filter((key) => siteProps.get(key)?.enabled);
    
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
          sites={getSiteIds()}
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
  const { metrics, siteProps, fileHandler } = props;

  const getSiteIds = (): string[] =>
    Array.from(siteProps.keys()).filter((key) => siteProps.get(key)?.enabled);
    //console.log("metrics: ",metrics);
    //console.log("getSiteIds: ",getSiteIds());
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
          sites={getSiteIds()}
          siteProps={siteProps}
          fileHandler={fileHandler}
        />{' '}
      </Box>
      <Box>
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
 * @param props is filehandler
 * @returns MUI box component
 */
export function InfoboxContainer(props: InfoContainerProps): JSX.Element {
  const { /** sites */ fileHandler } = props;
  return (
    <Box
      data-testid="infobox-component"
      sx={{
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: 'primary.light1',
        color: 'secondary.main',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: '1vw',
      }}
    >
      <InfoBox siteId="4b14a8" fileHandler={fileHandler} />
    </Box>
  );
}
