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

interface ChartProps {
  metrics: Array<string>;
  sites: Array<string>;
}

interface Histogram {
  bars: Array<Bar>;
}
interface Bar {
  x: string;
  y: number;
  fill: string;
}
/**
 * Structure for one CandleChart based on one metric
 */
interface CandleChart {
  candels: Array<Candle>;
}
interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

/**
 * getBarChartData get the data from backend to paint BarChartData.
 *
 * @param site what site to get data from.
 * Example 'stockholm'
 * @param metric what metric to get data from.
 * Example 'getPatient'
 * @returns a data list on correct format to paint BarChart.
 */
function getBarChartData(site: string, metric: string): Histogram {
  /**
   * Todo- At the moment this function only contains dummy data.
   * Implement code to get data from backend
   * Make sure corret color is retrived from Legends component
   */
  const data: Histogram = { bars: [] };
  if (site === 'stockholm' && metric === 'getPatient') {
    data.bars = [
      { x: '500', y: 20, fill: 'yellow' },
      { x: '600', y: 150, fill: 'yellow' },
      { x: '700', y: 200, fill: 'yellow' },
      { x: '2800', y: 900, fill: 'yellow' },
      { x: '3200', y: 200, fill: 'yellow' },
      { x: '3300', y: 150, fill: 'yellow' },
      { x: '4200', y: 200, fill: 'yellow' },
      { x: '5800', y: 805, fill: 'yellow' },
      { x: '6200', y: 600, fill: 'yellow' },
      { x: '15800', y: 85, fill: 'yellow' },
    ];
  } else if (site === 'stockholm' && metric === 'getBucket') {
    data.bars = [
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
    data.bars = [
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
    data.bars = [
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
      { x: '95800', y: 85, fill: 'blue' },
    ];
  } else if (site === 'manchester' && metric === 'getPatient') {
    data.bars = [
      { x: '500', y: 60, fill: 'green' },
      { x: '600', y: 210, fill: 'green' },
      { x: '700', y: 185, fill: 'green' },
      { x: '2800', y: 700, fill: 'green' },
      { x: '3200', y: 100, fill: 'green' },
      { x: '3300', y: 50, fill: 'green' },
      { x: '4200', y: 600, fill: 'green' },
      { x: '5800', y: 285, fill: 'green' },
      { x: '6200', y: 400, fill: 'green' },
      { x: '15800', y: 325, fill: 'green' },
    ];
  } else if (site === 'manchester' && metric === 'getBucket') {
    data.bars = [
      { x: '500', y: 60, fill: 'green' },
      { x: '600', y: 210, fill: 'green' },
      { x: '700', y: 185, fill: 'green' },
      { x: '2800', y: 700, fill: 'green' },
      { x: '3200', y: 100, fill: 'green' },
      { x: '3300', y: 50, fill: 'green' },
      { x: '4200', y: 600, fill: 'green' },
      { x: '5800', y: 285, fill: 'green' },
      { x: '6200', y: 400, fill: 'green' },
      { x: '15800', y: 325, fill: 'green' },
    ];
  } else if (site === 'tokyo' && metric === 'getPatient') {
    data.bars = [
      { x: '500', y: 10, fill: 'red' },
      { x: '600', y: 70, fill: 'red' },
      { x: '700', y: 385, fill: 'red' },
      { x: '2800', y: 900, fill: 'red' },
      { x: '3200', y: 60, fill: 'red' },
      { x: '3300', y: 120, fill: 'red' },
      { x: '4200', y: 380, fill: 'red' },
      { x: '5800', y: 130, fill: 'red' },
      { x: '6200', y: 700, fill: 'red' },
      { x: '15800', y: 225, fill: 'red' },
    ];
  } else if (site === 'tokyo' && metric === 'getBucket') {
    data.bars = [
      { x: '500', y: 10, fill: 'red' },
      { x: '600', y: 70, fill: 'red' },
      { x: '700', y: 385, fill: 'red' },
      { x: '2800', y: 900, fill: 'red' },
      { x: '3200', y: 60, fill: 'red' },
      { x: '3300', y: 120, fill: 'red' },
      { x: '4200', y: 380, fill: 'red' },
      { x: '5800', y: 130, fill: 'red' },
      { x: '6200', y: 700, fill: 'red' },
      { x: '15800', y: 225, fill: 'red' },
    ];
  }
  // Exempelvis GetPatient för site1
  // Exempelvis GetPatient för site2

  return data;
}

/**
 * getCandelChartData retrives data from backend needed to paint a single VictoryCandlestick.
 *
 * @param metric a string with the name of the metric to show in the candlechart.
 * example 'getPatient'
 * @param sites a string list containing 1-n sites that will be shown in the candlechart.
 * example ['s1','s2','s3','s4']
 * @returns a data structure in correct format to paint a candelChart.
 */
function getCandleChartData(metric: string, sites: Array<string>): CandleChart {
  const data: CandleChart = { candels: [] };
  /**
   * Todo- At the moment this function only contains dummy data.
   * Implement code to get data from backend
   * Make sure correct color is retrived from Legends component
   */
  if (
    metric === 'getPatient' &&
    sites[0] === 'stockholm' &&
    sites[1] === 'linköping'
  ) {
    data.candels = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, // s1
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, // s2
      { x: 3, open: 8, close: 11, high: 13, low: 2 }, // s2
    ];
  }
  if (
    metric === 'getBucket' &&
    sites[0] === 'stockholm' &&
    sites[1] === 'linköping'
  ) {
    data.candels = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
      { x: 3, open: 4, close: 9, high: 12, low: 0 }, // s2
    ];
  }
  return data;
}

/**
 * Draws a single victoryCandle.
 *
 * @param data the data needed to create a victorycandle. Must be in the following format
 * metric = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, // site1
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, // site2
    ];
 * @param width Is the fixed width of the candels in the chart. CandelRatio does not work in this case.
    Note that width might need to be changed depending on number of sites.
 * @returns a victory candle chart .
 */
function drawVictoryCandle(data: Array<Candle>, width: any): JSX.Element {
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
 * Draws a single boxPlotChart
 *
 * @param props Contains list of metrics and sites that should be drawn
 * Example metrics = ['getPatient', 'getBucket']
   sites=['stockholm', 'linköping', 'manchester', 'tokyo']
 * @returns BoxplotChart for given /?dataset?/
 */
export function BoxPlotChart(props: ChartProps): JSX.Element {
  const { metrics } = props;
  const { sites } = props;
  const width = 10;
  const victoryCandles: Array<JSX.Element> = [];

  // For metrics in props.metrics skapa victorycandles som innehåller alla props.sites

  metrics.forEach((metric) => {
    const data: CandleChart = getCandleChartData(metric, sites);
    victoryCandles.push(drawVictoryCandle(data.candels, width));
  });

  return (
    <VictoryChart>
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: {
            fontSize: 10,
            stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
          },
          axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
        }}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 10,
            transform: 'translate(0, 10)',
            angle: 45,
            stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
          },
          axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
        }}
      />
      <VictoryGroup offset={width + 5} domainPadding={{ x: width }}>
        {victoryCandles}
      </VictoryGroup>
    </VictoryChart>
  );
}

/**
 * draws a victory bar based on specified metric and site.
 *
 * @param data data needed to create a barChart. Must be in the following format
 *  siteNmetricN = [
      { x: '500', y: 20, fill: 'red' },
      { x: '600', y: 150, fill: 'red' },
      { x: '700', y: 200, fill: 'red' },
    ];
 * @param index ///NOT NEEDED?///
 * @param width xxx
 * @returns a single victory bar.
 */
function drawVictoryBar(
  data: Array<Bar>,
  index: any,
  width: number
): JSX.Element {
  return (
    <VictoryBar
      // key={index}
      labelComponent={
        <VictoryTooltip cornerRadius={0} pointerLength={0} dy={-10} />
      }
      barWidth={width}
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
 *Calculates number of unique x values in a single Chart
 
 * @param histograms array of histogram data structures
 * @returns number of uniqe x values
 */
function numberOfXvalues(histograms: Array<Histogram>): number {
  const xValues: any = [];
  histograms.forEach((histogram) => {
    histogram.bars.forEach((bar) => {
      xValues.push(bar.x);
    });
  });

  const uniqueXvalues = xValues.filter(
    (value: any, index: any, array: any) => array.indexOf(value) === index
  ).length;
  return uniqueXvalues;
}

/**
 *  drawHistogram draws a victoryChart containing 1..n bar charts.
 *
 * @param histograms Array of Histogram. All histograms that should be drawn in a single chart
 * @param metric a single metric. Used to print metricname in graph.
 * Example 'getPatient'
 * @param width width of a single bar
 * @returns a single victoryChart, <VictoryChart>...</VictoryChart>
 */
function drawHistogram(
  histograms: Array<Histogram>,
  metric: string,
  width: number
) {
  const victoryBars: Array<any> = [];
  histograms.forEach((histogram) => {
    victoryBars.push(drawVictoryBar(histogram.bars, 3, width));
  });

  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: 22, marginBottom: 0 }}>
        {metric}
      </p>
      <VictoryChart key={metric}>
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 10,
              stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
            },
            axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              // Later we want to add tickFormat and tickValues. This makes it possible to write "6-10ms" on the axis instead of the corresponding x values.
              // For this to be possible the data that is used to paint this set of victorybars needs to be accessed and a new function that determines the tickFormat is needed.
              fontSize: 10,
              transform: 'translate(0, 10)', // offset x-labels
              angle: 45, // titlt x labels
              stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
            },
            axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
          }}
        />
        <VictoryGroup domainPadding={{ x: [5, 0] }} offset={width}>
          {victoryBars}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

/**
 *  Draws 1-n barcharts.
 *  metrics.length = number of graphs returned by this function
 * 
 * @param props contains list of metrics and list of sites.
 * Example metrics = ['getPatient', 'getBucket']
   sites=['stockholm', 'linköping', 'manchester', 'tokyo']
 * @returns A list of victorycharts
 * [<VictoryChart>Chart1</VictoryChart>,<VictoryChart>Chart2</VictoryChart>]
 */
export function BarChart(props: ChartProps): JSX.Element {
  const { metrics } = props; // Lista med metrics
  const { sites } = props; // Lista med sites
  const barGraphList: any = [];

  // This does not effect the actual graph width,
  // width of BarChart is based on parent container
  const graphWidth = 300;

  metrics.forEach((metric) => {
    const barGraph: Array<Histogram> = [];
    sites.forEach((site) => {
      const data: Histogram = getBarChartData(site, metric);
      barGraph.push(data);
    });
    const width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
    barGraphList.push(drawHistogram(barGraph, metric, width));
  });

  return <div>{barGraphList}</div>;
}
