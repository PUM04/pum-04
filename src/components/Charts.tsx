/**
 *
 * @file Contains the component that paints Charts. Gets data for chart.
 */

import React from 'react';
import {} from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryTooltip,
  VictoryCandlestick,
} from 'victory';

/**
 * Top level component.
 *
 * @returns top level component
 */

/**
 * getBarChartData get the data from backend to paint BarChartData.
 *
 * @param site what site to get data from.
 * @param metric what metric to get data from.
 * @returns a data list on correct format to paint BarChart.
 */
function getBarChartData(site: any, metric: any) {
  let data: any = [];
  if (site === 'stockholm' && metric === 'getPatient') {
    data = [
      { x: '500', y: 20, fill: 'yellow' },
      { x: '600', y: 150, fill: 'yellow' },
      { x: '700', y: 200, fill: 'yellow' },
      { x: '2800', y: 900, fill: 'yellow' },
      { x: '3200', y: 200, fill: 'yellow' },
      { x: '3300', y: 150, fill: 'yellow' },
      { x: '4200', y: 200, fill: 'yellow' },
      { x: '5800', y: 805, fill: 'yellow' },
      { x: '6200', y: 600, fill: 'yellow' },
    ];
  } else if (site === 'stockholm' && metric === 'getBucket') {
    data = [
      { x: '500', y: 20, fill: 'yellow' },
      { x: '600', y: 150, fill: 'yellow' },
      { x: '700', y: 200, fill: 'yellow' },
      { x: '2800', y: 900, fill: 'yellow' },
      { x: '3200', y: 200, fill: 'yellow' },
      { x: '3300', y: 150, fill: 'yellow' },
      { x: '4200', y: 200, fill: 'yellow' },
      { x: '5800', y: 85, fill: 'yellow' },
      { x: '6200', y: 200, fill: 'yellow' },
      { x: '15800', y: 85, fill: 'yellow' },
    ];
  } else if (site === 'linköping' && metric === 'getPatient') {
    data = [
      { x: '500', y: 20, fill: 'blue' },
      { x: '600', y: 150, fill: 'blue' },
      { x: '700', y: 200, fill: 'blue' },
      { x: '2800', y: 900, fill: 'blue' },
      { x: '3200', y: 200, fill: 'blue' },
      { x: '3300', y: 150, fill: 'blue' },
      { x: '4200', y: 200, fill: 'blue' },
      { x: '5800', y: 85, fill: 'blue' },
      { x: '6200', y: 200, fill: 'blue' },
      { x: '15800', y: 85, fill: 'blue' },
    ];
  } else if (site === 'linköping' && metric === 'getBucket') {
    data = [
      { x: '500', y: 20, fill: 'blue' },
      { x: '600', y: 150, fill: 'blue' },
      { x: '700', y: 200, fill: 'blue' },
      { x: '2800', y: 900, fill: 'blue' },
      { x: '3200', y: 200, fill: 'blue' },
      { x: '3300', y: 150, fill: 'blue' },
      { x: '4200', y: 200, fill: 'blue' },
      { x: '5800', y: 85, fill: 'blue' },
      { x: '6200', y: 200, fill: 'blue' },
      { x: '15800', y: 85, fill: 'blue' },
    ];
  } else if (site === 'manchester' && metric === 'getPatient') {
    data = [
      { x: '500', y: 20, fill: 'green' },
      { x: '600', y: 150, fill: 'green' },
      { x: '700', y: 200, fill: 'green' },
      { x: '800', y: 900, fill: 'green' },
    ];
  } else if (site === 'manchester' && metric === 'getBucket') {
    data = [
      { x: '500', y: 20, fill: 'green' },
      { x: '600', y: 150, fill: 'green' },
      { x: '700', y: 200, fill: 'green' },
      { x: '800', y: 900, fill: 'green' },
    ];
  } else if (site === 'tokyo' && metric === 'getPatient') {
    data = [
      { x: '500', y: 20, fill: 'red' },
      { x: '600', y: 150, fill: 'red' },
      { x: '700', y: 200, fill: 'red' },
      { x: '800', y: 900, fill: 'red' },
    ];
  } else if (site === 'tokyo' && metric === 'getBucket') {
    data = [
      { x: '500', y: 20, fill: 'red' },
      { x: '600', y: 150, fill: 'red' },
      { x: '700', y: 200, fill: 'red' },
      { x: '800', y: 900, fill: 'red' },
    ];
  }
  // Exempelvis GetPatient för site1
  // Exempelvis GetPatient för site2

  return data;
}

/**
 * getCandelChartData get the data from backend to paint candelChart.
 *
 * @param metric what metric to get data from.
 * @param sites a list of sites.
 * @returns a data list on correct format to paint candelChart.
 */
function getCandleChartData(metric: any, sites: any) {
  let data: any = [];

  if (
    metric === 'getPatient' &&
    sites[0] === 'stockholm' &&
    sites[1] === 'linköping'
  ) {
    data = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, // s1
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, // s2
    ];
  }
  if (
    metric === 'getBucket' &&
    sites[0] === 'stockholm' &&
    sites[1] === 'linköping'
  ) {
    data = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
    ];
  }
  return data;
}

/**
 * Creats the Victory Candle.
 *
 * @param data is the data to create this bar.
 * @param width is the width of candel. CandelRation does not work in this case. Note that width might need to changed depending on number of sites/metrics.
 * @returns a victorybarchart to be append to list.
 */
function drawVictoryCandle(data: any, width: any) {
  return (
    <VictoryCandlestick
      labelComponent={<VictoryTooltip cornerRadius={0} pointerLength={0} />}
      labels={({ datum }) =>
        `min:${datum.low}\nmax:${datum.high}\nclose:${datum.close}\nopen:${
          datum.open
        }\nmean:${'30'}`
      }
      candleWidth={width}
      data={data}
      style={{
        data: {
          fill: 'orange',
          fillOpacity: 0.8,
          stroke: 'gray',
        },
      }}
    />
  );
}

/**
 * Component for BoxPlotChart
 *
 * @param props contains list of metrics and sites. These are the one to painted.
 * @returns BoxplotChart for given /?dataset?/
 */
export function BoxPlotChart(props: any): JSX.Element {
  const { metrics } = props; // Lista med metrics
  const { sites } = props; // Lista med sites
  const width = 10;
  const victoryCandles = [];

  // For metrics in props.metric skapa victorychart som innehåller alla props.sites

  for (let i = 0; i < metrics.length; i++) {
    const data = getCandleChartData(metrics[i], sites);
    victoryCandles.push(drawVictoryCandle(data, width));
  }
  return (
    <VictoryChart>
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 10,
            transform: 'translate(0, 10)',
            angle: 45,
          },
        }}
      />
      <VictoryGroup offset={width + 5} domainPadding={{ x: width }}>
        {victoryCandles}
      </VictoryGroup>
    </VictoryChart>
  );
}

/**
 * Creats the victory bar.
 *
 * @param data is the data to create this bar.
 * @param index ///NOT NEEDED?///
 * @returns a victorybarchart to be append to list.
 */
function drawVictoryBar(data: any, index: any) {
  return (
    <VictoryBar
      key={index}
      labelComponent={
        <VictoryTooltip cornerRadius={0} pointerLength={0} dy={-10} />
      }
      barRatio={0.7}
      labels={({ datum }) => datum.y}
      style={{
        data: {
          fill: ({ datum }) => datum.fill,
        },
      }}
      data={data}
    />
  );
}

/**
 *  drawHistogram draws the chart.
 *
 * @param sites contains list of metrics and list of sites.
 * @param metric contains list of metrics and list of sites.
 * @returns BarChart for given /?dataset?/
 */
function drawHistogram(sites: any, metric: any) {
  const victoryBars = [];

  for (let i = 0; i < sites.length; i++) {
    console.log(sites[i]);
    victoryBars.push(drawVictoryBar(sites[i], i));
  }

  return (
    <VictoryChart key={metric} domainPadding={{ x: [20, 20], y: [20, 20] }}>
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 10,
            transform: 'translate(0, 10)',
            angle: 45,
          },
        }}
      />
      <VictoryGroup offset={5} colorScale={['tomato', 'orange', 'gold']}>
        {victoryBars}
      </VictoryGroup>
    </VictoryChart>
  );
}

/**
 *  Component for BarChart
 *
 * @param props contains list of metrics and list of sites.
 * @returns BarChart for given /?dataset?/
 */
export function BarChart(props: any): JSX.Element {
  const { metrics } = props; // Lista med metrics
  const { sites } = props; // Lista med sites
  const barGraphList = [];

  for (let i = 0; i < metrics.length; i++) {
    const barGraph = [];
    for (let t = 0; t < sites.length; t++) {
      const data = getBarChartData(sites[t], metrics[i]);
      barGraph.push(data);
    }
    barGraphList.push(drawHistogram(barGraph, 2));
  }
  return <div>{barGraphList}</div>;
}
