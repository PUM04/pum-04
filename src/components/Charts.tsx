/**
 *
 * @file Contains the component that paints Charts. Gets data for chart.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Divider } from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryTooltip,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
} from 'victory';
import { Site } from './SiteInterface';
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
  siteProps: Map<string, Site>;
  fileHandler: any;
}

class Bar {
  public x: string;
  public y: number;
  public fill: string;

  constructor(x: string = '0', y: number = 0, fill = 'black') {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
}

class Histogram {
  public bars: Array<Bar>;

  constructor(bars: Array<Bar> = []) {
    this.bars = bars;
  }
}

/* Datastructure for drawing a histogram
  Example
* {bars = [
      { x: '500', y: 20, fill: 'yellow' },
      { x: '600', y: 150, fill: 'yellow' },
      { x: '700', y: 200, fill: 'yellow' },
    ];}
*/
interface HistogramInterface {
  bars: Array<Bar>;
}
/**
 * Data for drawing a single bar in a histogram
 * { x: '700', y: 200, fill: 'yellow' }
 */
interface BarInterface {
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
}

/**
 * Single candle used in a CandleChart
 * { x: 3, open: 4, close: 9, high: 12, low: 0 }
 */
interface Candle {
  x: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

/**
 * getBarChartData parse and get the data for the correct site and metric.
 *
 * @param site what site to get data from.
 * @param metric what metric to get data from.
 * @param color what color to paint the bars.
 * @param histogramData data from backend.
 * @returns a Histogram object containing all data for drawing a BarChart.
 */
function getBarChartData(
  site: string,
  metric: string,
  color: string,
  histogramData: any
): Histogram {
  /**
   * Make sure corret color is retrived from Legends component
   */

  const histogram: Histogram = { bars: [] };
  console.log("")
  const jsonData = JSON.parse(histogramData.get(site));

  const metricData = jsonData ? jsonData[metric]?.data : null;

  metricData?.forEach((bar: any) => {
    //if (bar.length <= 3000) {
      histogram.bars.push({ x: String(bar.length), y: bar.count, fill: color });
    //}
  });
  return histogram;
}

/**
 * getCandleChartData parse and get the data for the correct metric and sites.
 *
 * @param metric a string with the name of the metric to show in the candlechart.
 * example 'getPatient'
 * @param sites a string list containing 1-n sites that will be shown in the candlechart.
 * example ['s1','s2','s3','s4']
 * @param boxDiagramData data from backend.
 * @param siteProps map ecah siteKey to a color
 * @returns a data structure in correct format to paint a candleChart.
 */
function getCandleChartData( //rewrite this function
  metric: string, //should be a metric array
  sites: Array<string>,
  boxDiagramData: Map<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  siteProps: Map<string, Site> // used later when structure for candlechart is known.
): CandleChart {
  const candle: CandleChart = { candles: [] };
  /**
   * Todo- At the moment this function only contains dummy data.
   * Implement code to get data from backend
   * Make sure correct color is retrived from Legends component
   *
   */

  sites.forEach((site, index) => {
    const siteData = boxDiagramData.get(site);
    if (!siteData) return;

    const jsonData = JSON.parse(siteData);
    const metricData = jsonData ? jsonData[metric] : null;
    if (!metricData) return;

    candle.candles.push({

      x: metric,
      open: metricData.first_quartile,
      close: metricData.third_quartile,
      high: metricData.max,
      low: metricData.min,
    });
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
function drawVictoryCandle(data: Array<Candle>, width: any): JSX.Element {
  //console.log(JSON.stringify(data));
  return (
    <VictoryCandlestick
      key={JSON.stringify(data)}
      labelComponent={<VictoryTooltip cornerRadius={0} pointerLength={0} />}
      labels={({ datum }) =>
        `min:${datum.low}
        \nmax:${datum.high}
        \nclose:${datum.close}
        \nopen:${datum.open}
        \nmean:${'30'}`
      }
      candleWidth={width}
      data={data}
      style={{
        data: {
          fill: 'orange',
          stroke: 'gray',
        },
      }}
    />
  );
}

function CustomTickLabel(props: any): any {
  //console.log('hejsan', props);
  const { x, y, text, ticks, index } = props;
  const padding = 1; // adjust the value to increase/decrease padding between labels

  const strokeWidth = 1;
  const color = 'grey';
  const lineLength = 20;
  const someValue = 0;
  const someOffset = 210;

  //let xValue = someValue*(index/ticks.length)+someOffset;
  let xValue = someOffset / ticks.length; // a bit fucky wucky, not tried with too many metrics or so, it is basiclly only gussed values. TODO: make more scientific
  return (
    <g transform={`translate(${x}, ${y})`}>
      <VictoryLabel
        textAnchor="start"
        verticalAnchor="end"
        angle="30"
        style={{ fontSize: Math.min(125 / text.length, 10), fill: '#404040' }}
        x={0}
        y={0}
        dy={padding / 2}
        text={text}
      />
      <line
        x1={xValue}
        x2={xValue}
        y1={0 - 11}
        y2={0 - 11 - lineLength}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </g>
  );
}

/**
 * Get boxdiagrams for all sites with memoization.
 *
 * @param siteIds ids of all sites
 * @param fileHandler filehandler to get data from backend
 * @returns a map with siteId as key and the data as value
 */
function useBoxDiagrams(siteIds: string[], fileHandler: any) {
  return useMemo(() => {
    const histograms: Map<string, string> = new Map();
    siteIds.forEach((id) => histograms.set(id, String(fileHandler.GetBoxDiagram(id))));
    return histograms;
  }, [JSON.stringify(siteIds)]);
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
  const boxDiagramData = useBoxDiagrams(sites, fileHandler);

  if (fileHandler === undefined) {
    return <div />;
  }

  // For metrics in props.metrics skapa victorycandles som innehåller alla props.sites
  metrics.forEach((metric) => {
    const data: CandleChart = getCandleChartData(
      metric,
      sites,
      boxDiagramData,
      siteProps
    );
    victoryCandles.push(drawVictoryCandle(data.candles, width));
  });

  return (
    <VictoryChart
      data-testid="victory-chart"
      //this below is a start for the new
      //horizontal
      //height={500}//set this depending on the total amount of sites in buckets (ticks)
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
            padding: 20,
            fontSize: 40 / metrics.length,
            angle: 45,
            // offset x-labels
            stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
          },
          axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
        }}
        tickLabelComponent={<CustomTickLabel />}
        tickFormat={(tick: any, index: number, ticks: any) => `${tick}`}
      />

      <VictoryGroup
        offset={width + offsetPadding}
        domainPadding={{ x: offsetPadding }}
      >
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
  console.log("data: ",JSON.stringify(data));
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

enum ScaleTypes {
  'Log',
  'Linear',
  'Percent',
}
let graphScaleType = ScaleTypes.Linear; // change with a button somewhere else

function getScaleProps() {
  switch (graphScaleType) {
    case ScaleTypes.Linear: {
      return {
        scale: { x: 'linear', y: 'linear' }, //default is already this but to make the code more readable
      };
    }
    case ScaleTypes.Log: {
      return {
        scale: { x: 'linear', y: 'log' },
        minDomain: { y: 1 }, //default is y=0 but then the graph is wacky
      };
    }
    case ScaleTypes.Percent: {
      console.warn('TODO: NO PERCENT FUNCTION MADE!');
    }
    default: {
      console.warn('A type not supported was called!');
    }
  }
  //if something breaks return empty
  return {};
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
  const formatTickDifference = (tick: any, index: number, ticksArray: any) => {
    if (index < ticksArray.length - 1) {
      if (tick == ticksArray[index + 1] - 1) {
        return `${tick} ms`;
      } else {
        const difference = `${tick} - ${ticksArray[index + 1] - 1} ms`;
        return difference;
      }
    }
    return `${tick} ms - `;
  };

  const victoryBars: Array<any> = [];
  histograms.forEach((histogram) => {
    victoryBars.push(drawVictoryBar(histogram.bars, width));
  });

  return (
    <div key={metric}>
      <p
        data-testid="graph-header"
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginBottom: 0,
          color: '#004688',
        }}
      >
        {metric}
      </p>
      <Divider
        sx={{
          borderBottomWidth: 2,
          marginLeft: '30%',
          marginRight: '30%',
        }}
      />
      <VictoryChart>
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 8,
              stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
            },
            axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
          }}
        />
        <VictoryAxis
          //tickComponent={GroupLine}
          tickLabelComponent={<CustomTickLabel />}
          tickFormat={(tick: any, index: number, ticks: any) => {
            return formatTickDifference(tick, index, ticks);
          }}
          //tickComponent={<CustomTick />}
          style={{
            tickLabels: {
              fontSize: 8,
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
 * Get histograms for all given site ids with memoization.
 *
 * @param siteIds ids of the sites
 * @param fileHandler filehandler to get histograms from
 * @returns a map of histograms
 */
function useHistograms(siteIds: string[], fileHandler: any):Map<string,string> {
  return useMemo(() => {
    const histograms: Map<string, string> = new Map();
    siteIds.forEach((id) => histograms.set(id, fileHandler.GetHistogram(id)));
    return histograms;
  }, [JSON.stringify(siteIds)]);
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

  const [barGraphList, setBarGraphList] = useState<any[]>([]);

  const histogramData = useHistograms(sites, fileHandler);

  // This does not effect the actual graph width,
  // width of BarChart is based on parent container

  useEffect(() => {
    const graphWidth = 300;
    const newBarGraphList: Array<any> = [];
    metrics.forEach((metric) => {
      let barGraph: Array<Histogram> = [];
      sites.forEach((site) => {
        const siteProp = siteProps.get(site);
        let color = siteProp?.color;
        if (!color) {
          color = 'cyan';
        }
        const data: Histogram = getBarChartData(
          site,
          metric,
          color,
          histogramData
        );
        barGraph.push(data);
      });
      barGraph = removeEmptyXValues(barGraph);
      barGraph = mergeXvalues(barGraph, graphWidth, sites);
      const width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
      newBarGraphList.push(drawHistogram(barGraph, metric, width));
    });
    setBarGraphList(newBarGraphList);
  }, [fileHandler, metrics, siteProps, sites]);

  return <div data-testid="barchart">{barGraphList}</div>;
}

/**
 *
 * @param barGraph
 * @returns
 */
function removeEmptyXValues(barGraph: Histogram[]): Array<Histogram> {
  const getEmptyXValues = (barGraph: Histogram[]) => {
    const emptyXValues = new Set();

    let nonEmptyBars: Bar[] = [];
    //
    barGraph.forEach((histogram) => {
      nonEmptyBars = nonEmptyBars.concat(histogram.bars.filter((bar: { y: number }) => bar.y !== 0));
    });
    barGraph.forEach((histogram) => {
      histogram.bars.forEach((bar: { y: number; x: string }) => {
        if (
          bar.y === 0 &&
          !nonEmptyBars.some((b: { x: string }) => b.x === bar.x)
        ) {
          emptyXValues.add(bar.x);
        }
      });
    });
    return emptyXValues;
  };

  const _removeEmptyXValues = (barGraph: any[], emptyXValues: Set<unknown>) => {
    let newBarGraph: Histogram[] = [];
    barGraph.forEach((histogram: { bars: any[] }) => {
      let newHistogram: Histogram = new Histogram();
      let keepZero: boolean = false;
      histogram.bars.forEach((bar, i) => {
        if (emptyXValues.has(bar.x)) {
          if (keepZero) {
            newHistogram.bars.push(bar);
          }
          keepZero = false;
        } else {
          newHistogram.bars.push(bar);
          keepZero = true;
        }
      });
      newBarGraph.push(newHistogram);
    });
    return newBarGraph;
  };

  const emptyXvalues = getEmptyXValues(barGraph);
  console.log("EmptyX: ",emptyXvalues);
  barGraph = _removeEmptyXValues(barGraph, emptyXvalues);
  return barGraph;
}

/**
 * Merges adjacent bars in each histogram of the barGraph array if their width is smaller than a threshold.
 * @param barGraph An array of Histogram objects to be processed.
 * @param graphWidth The width of the graph in pixels.
 * @param sites A list of sites.
 * @returns A new array of Histogram objects with merged bars.
 */
function mergeXvalues(
  barGraph: Array<Histogram>,
  graphWidth: any,
  sites: any
): Array<Histogram> {
  let newBarGraph: Array<Histogram> = [];
  let width = graphWidth / (numberOfXvalues(barGraph) * sites.length);

  const tooSmallWidth = 6; //target width of single bars
  const maxLoopCount = 50; // a fail safe in case something goes wrong
  let mergeAmount = 1; //start merge amount
  let loopCount = 0;

  if (width >= tooSmallWidth) {
    console.log('no changes when running mergeXvalues()');
    return barGraph;
  }
  while (width < tooSmallWidth) {
    newBarGraph = [];
    barGraph.forEach((histo) => {
      let newHisto: Histogram = new Histogram([]);
      console.log("newHisto: ",newHisto);
      histo.bars.forEach((bar, i) => {
        const newIndex = Math.floor(i / mergeAmount);

        if (newHisto.bars[newIndex] === undefined) {
          console.log("x: ",bar.x,"color: ",bar.fill);
          newHisto.bars.push(new Bar(bar.x, bar.y, bar.fill));//bar.fill causes unexpected colors at weird times
        } else {
          newHisto.bars[newIndex].y += bar.y;
        }
      });
      newBarGraph.push(newHisto);
    });

    if (loopCount > maxLoopCount) {
      console.warn(
        '----------------------WARNING REACHED LOOP MAX!----------------------'
      );
      break;
    }
    loopCount += 1;
    mergeAmount += 1;
    width = graphWidth / (numberOfXvalues(newBarGraph) * sites.length);
  }

  return newBarGraph;
}
