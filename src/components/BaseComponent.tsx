/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { List, ListItem, Grid } from '@mui/material';
import { BoxPlotChart, BarChart } from './Charts';
import InfoBox from './InfoBox';
import { Site } from './SiteInterface';

interface GraphComponentProps {
  metrics: Array<string>;
  siteProps: Map<string, Site>;
  fileHandler: any;
}

interface InfoContainerProps {
  siteProps: Map<string, Site>;
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
          fileHandler={fileHandler}
          siteProps={siteProps}
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
  const { siteProps, fileHandler } = props;
  const [siteIds, setSiteIds] = useState<any[]>([]);

  useEffect(() => {
    const sites = Array.from(siteProps.keys()).filter(
      (key) => siteProps.get(key)?.enabled
    );
    setSiteIds(sites);
  }, [siteProps]);
  return (
    <Box
      data-testid="infobox-component"
      sx={{
        flexDirection: 'row',
        display: 'inline-flex',
        backgroundColor: 'primary.light1',
        color: 'secondary.main',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: '1vw',
      }}
    >
      <List
        style={{
          flexDirection: 'row',
        }}
      >
        {siteIds.map((id) => (
          <ListItem key={id}>
            <InfoBox siteId={id} fileHandler={fileHandler} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
