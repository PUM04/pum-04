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
import { SiteProperties } from './SitePropetiesInterface';
/**
 * Top level component.
 *
 * @returns top level component
 */
/**
 * List of metrics and sites example
 * metrics = ['getPatient', 'getBucket']
   sites=['stockholm', 'linköping', 'manchester', 'tokyo']
 */
interface ChartProps {
  metrics: Array<string>;
  sites: Array<string>;
  siteProps: Map<string, SiteProperties>;
  fileHandler: any;
}
/* Datastructure for drawing a histogram
  Example
* {bars = [
      { x: '500', y: 20, fill: 'yellow' },
      { x: '600', y: 150, fill: 'yellow' },
      { x: '700', y: 200, fill: 'yellow' },
    ];}
*/
interface Histogram {
  bars: Array<Bar>;
}
/**
 * Data for drawing a single bar in a histogram
 * { x: '700', y: 200, fill: 'yellow' }
 */
interface Bar {
  x: string;
  y: number;
  fill: string;
}
/**
 * Data structure for drawing one CandleChart based on one metric
 * {candles = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
      { x: 3, open: 4, close: 9, high: 12, low: 0 }, 
    ];}
 */
interface CandleChart {
  candles: Array<Candle>;
  colors: Array<string>
}

/**
 * Single candle used in a CandleChart
 * { x: 3, open: 4, close: 9, high: 12, low: 0 }
 */
interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

/**
 * getBarChartData get the data from backend to paint a BarChartData.
 *
 * @param site what site to get data from.
 * @param metric what metric to get data from.
 * @param color   what color to paint the bars.
 * @param fileHandler is the filehandler :)
 * @returns a Histogram object containing all data for drawing a BarChart.
 */
function getBarChartData(
  site: string,
  metric: string,
  color: string,
  fileHandler: any
): Histogram {
  /**
   * Make sure corret color is retrived from Legends component
   */

  const histogram: Histogram = { bars: [] };

  const { data } = JSON.parse(fileHandler.GetHistogram(site))[metric];

  data.forEach((bar: any) => {
    if (bar.length <= 3000) {
      histogram.bars.push({ x: bar.length, y: bar.count, fill: color });
    }
  });
  return histogram;
}

/**
 * getCandleChartData retrives data from backend needed to paint a single VictoryCandlestick.
 *
 * @param metric a string with the name of the metric to show in the candlechart.
 * example 'getPatient'
 * @param sites a string list containing 1-n sites that will be shown in the candlechart.
 * example ['s1','s2','s3','s4']
 * @param siteProps map ecah siteKey to a color
 * @param fileHandler is fuleHandler :)
 * @returns a data structure in correct format to paint a candleChart.
 */
function getCandleChartData(
  metric: string,
  sites: Array<string>,
  fileHandler: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  siteProps: Map<string, SiteProperties> // used later when structure for candlechart is known.
): CandleChart {
  const candle: CandleChart = { candles: [], colors:[] };
  /**
   * Todo- At the moment this function only contains dummy data.
   * Implement code to get data from backend
   * Make sure correct color is retrived from Legends component
   *
   */

  

  const colors:Array<string> = [];
    sites.forEach((site:string) => {
      const siteProp = siteProps.get(site);
      let color = siteProp?.color;
      if (!color) {
        color = 'cyan';
      }
      colors.push(color)
    });
  candle.colors = colors;

  sites.forEach((site, index) => {
    const data = JSON.parse(fileHandler.GetBoxDiagram(site))[metric];
    candle.candles.push({
      x : index +1,
      open: data.first_quartile,
      close: data.third_quartile,
      high: data.max,
      low: data.min,
    });
    // TODO: Implement mean
  });

  return candle;
}

/**
 * Draws a single victoryCandle.
 *
 * @param data the data needed to create a victorycandle. Must be in the following format
 * data = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, 
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, 
    ];
 * @param width Is the fixed width of the candles in the chart. CandleRatio does not work in this case.
    Note that width might need to be changed depending on number of sites.
 * @returns a VictoryCandlestick .
 */
function drawVictoryCandle(candels:CandleChart, width: any): JSX.Element {
  const getColor = (index:number):string => {
    return candels.colors[index];
  };
  return (
    <VictoryCandlestick
      key={JSON.stringify(candels.candles)}
      labelComponent={<VictoryTooltip cornerRadius={0} pointerLength={0} />}
      labels={({ datum }) =>
        `min:${datum.low}\nmax:${datum.high}\nclose:${datum.close}\nopen:${
          datum.open
        }\nmean:${'30'}`
      }
      
     
      candleWidth={width}
      data={candels.candles}
      style={{
        data: {
          fill: ({ datum }) =>getColor(datum.x),
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
 * @returns A VictoryChart with an array of VictoryCandles.
 */
export function BoxPlotChart(props: ChartProps): JSX.Element {
  const { metrics, sites, siteProps, fileHandler } = props;
  const width = 10;
  const offsetPadding = 5;
  const victoryCandles: Array<JSX.Element> = [];

  if (fileHandler === undefined) {
    return <div />;
  }

  // For metrics in props.metrics skapa victorycandles som innehåller alla props.sites
  metrics.forEach((metric) => {
    const data: CandleChart = getCandleChartData(
      metric,
      sites,
      fileHandler,
      siteProps
    );
    victoryCandles.push(drawVictoryCandle(data, width));
  });

  return (
    <VictoryChart data-testid="victory-chart"
    height={1000}
    width={1000}
    >
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
      <VictoryGroup offset={width + offsetPadding} domainPadding={{ x: width }}>
        {victoryCandles}
      </VictoryGroup>
    </VictoryChart>
  );
}

/**
 * Draws a VictoryBar based on data.
 *
 * @param data data needed to create a barChart. Must be in the following format
 *  siteNmetricN = [
      { x: '500', y: 20, fill: color },
      { x: '600', y: 150, fill:colorr },
      { x: '700', y: 200, fill: color },
    ];'red'color
 * @param width width of a bar.
 * @returns a single VictoryBar.
 */
function drawVictoryBar(data: Array<Bar>, width: number): JSX.Element {
  return (
    <VictoryBar
      data-testid="getdata"
      key={JSON.stringify(data)}
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
 *
 * @param histograms array of histogram objects
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
    victoryBars.push(drawVictoryBar(histogram.bars, width));
  });

  return (
    <div key={metric}>
      <p
        data-testid="graph-header"
        style={{ textAlign: 'center', fontSize: 22, marginBottom: 0 }}
      >
        {metric}
      </p>
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
              // Later we want to add tickFormat and tickValues. This makes it possible to write "6-10ms" on the axis instead of the corresponding x value.
              // For this to be possible the data that is used to paint this set of victorybars needs to be accessed and a new function that determines the tickFormat is needed.
              fontSize: 10,
              transform: 'translate(0, 10)', // offset x-labels
              angle: 45, // tilt x labels
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
 *  Draws 1-n VictoryCharts containing 1-n VictoryBars.
 *  metrics.length = number of VictoryCharts
 *  sites.length = number of BarCharts in each VictoryChart
 *
 * @param props :ChartProps contains list of metrics,list of sites.
 * And a map, maping each site to a color
 * @returns A list of victorycharts
 * [<VictoryChart>BarchartsArray</VictoryChart>,<VictoryChart>BarChartsArray</VictoryChart>]
 */
export function BarChart(props: ChartProps): JSX.Element {
  const { metrics, sites, siteProps } = props;
  const { fileHandler } = props;
  const barGraphList: any = [];

  if (fileHandler === undefined) {
    return <div />;
  }

  // This does not effect the actual graph width,
  // width of BarChart is based on parent container
  const graphWidth = 300;
  metrics.forEach((metric) => {
    const barGraph: Array<Histogram> = [];
    sites.forEach((site) => {
      const siteProp = siteProps.get(site);
      let color = siteProp?.color;
      if (!color) {
        color = 'cyan';
      }
      const data: Histogram = getBarChartData(site, metric, color, fileHandler);
      barGraph.push(data);
    });
    const width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
    barGraphList.push(drawHistogram(barGraph, metric, width));
  });
  return <div data-testid="barchart">{barGraphList}</div>;
}
