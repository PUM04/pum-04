/**
 * @file Contains components that is the base structure.
 */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useEffect, useState } from 'react';
import { VictoryChartProps } from 'victory';
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

export enum ScaleTypes {
  'NOTSET' = 0, // for testing remove
  'Log',
  'Linear',
  'Percent',
}

/**
 * Buttons used to switch between scaletypes
 *
 * @param setGraphScaleTypeBox useState that sets the current scaleType
 * @param graphScaleType the current scale type
 * @returns A JSX element with three MUI buttons
 */
function ScaleTypeButton(
  setGraphScaleTypeBox: React.Dispatch<React.SetStateAction<ScaleTypes>>,
  graphScaleType: ScaleTypes
): JSX.Element {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        color={graphScaleType === ScaleTypes.Linear ? 'info' : 'primary'}
        onClick={() => setGraphScaleTypeBox(ScaleTypes.Linear)}
      >
        Linear
      </Button>
      <Button
        color={graphScaleType === ScaleTypes.Log ? 'info' : 'primary'}
        onClick={() => setGraphScaleTypeBox(ScaleTypes.Log)}
      >
        Log
      </Button>
      <Button
        color={graphScaleType === ScaleTypes.Percent ? 'info' : 'primary'}
        onClick={() => setGraphScaleTypeBox(ScaleTypes.Percent)}
      >
        %
      </Button>
    </ButtonGroup>
  );
}

interface ScaleTypeProp {
  scaleType: VictoryChartProps;
  percent: boolean;
}

/**
 * Returns the Victory props for scaling a graph
 *
 * @param graphScaleType Which type of scale: Linear, Logaritmic or Percentage
 * @returns ScaleTypeProp, where Scale is the primary return, but includes a bool for percentage
 */
export function getScaleProps(graphScaleType: ScaleTypes): ScaleTypeProp {
  switch (graphScaleType) {
    case ScaleTypes.Linear: {
      const scale: VictoryChartProps = {
        scale: { x: 'linear', y: 'linear' }, // default is already this but to make the code more readable
        minDomain: { y: 0 },
      };
      return {
        scaleType: scale, // default is already this but to make the code more readable
        percent: false,
      };
    }
    case ScaleTypes.Log: {
      const scale: VictoryChartProps = {
        scale: { x: 'linear', y: 'log' },
        minDomain: { y: 0.5 }, // default is y=0 but then the graph is wacky
      };
      return {
        scaleType: scale,
        percent: false,
      };
    }
    case ScaleTypes.Percent: {
      const scale: VictoryChartProps = {
        scale: { x: 'linear', y: 'linear' }, // default is already this but to make the code more readable
        minDomain: { y: 0 },
      };
      return {
        scaleType: scale,
        percent: true,
      };
      console.warn('TODO: NO PERCENT FUNCTION MADE!');
      break;
    }
    default: {
      console.warn('A type not supported was called!');
      break;
    }
  }
  const scale: VictoryChartProps = {
    scale: { x: 'linear', y: 'linear' }, // default is already this but to make the code more readable
    minDomain: { y: 0 },
  };

  return {
    scaleType: scale,
    percent: false,
  };
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

  const [graphScaleType, setGraphScaleTypeBox] = useState(ScaleTypes.Linear);

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
      {ScaleTypeButton(setGraphScaleTypeBox, graphScaleType)}
      <Box>
        {' '}
        <BoxPlotChart
          metrics={metrics}
          sites={getSiteIds()}
          fileHandler={fileHandler}
          siteProps={siteProps}
          getScaleProps={
            getScaleProps(graphScaleType).scaleType as VictoryChartProps
          }
          percent={getScaleProps(graphScaleType).percent}
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

  const [graphScaleType, setGraphScaleTypeBox] = useState(ScaleTypes.Linear);

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
        minHeight: '30vw',
        backgroundColor: 'primary.light2',
        '&:hover': {
          backgroundColor: 'primary.light2',
        },
      }}
    >
      {ScaleTypeButton(setGraphScaleTypeBox, graphScaleType)}
      <Box>
        {' '}
        <BarChart
          metrics={metrics}
          sites={getSiteIds()}
          siteProps={siteProps}
          fileHandler={fileHandler}
          getScaleProps={
            getScaleProps(graphScaleType).scaleType as VictoryChartProps
          }
          percent={getScaleProps(graphScaleType).percent}
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
        width: '100%',
        flexDirection: 'row',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
        backgroundColor: 'primary.light1',
        color: 'secondary.main',
        flexWrap: 'wrap',
      }}
    >
      {siteIds.map((id) => (
        <InfoBox siteId={id} key={id} fileHandler={fileHandler} />
      ))}
    </Box>
  );
}
