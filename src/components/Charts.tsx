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
  VictoryChartProps,
} from 'victory';
import { TextProps } from 'victory-core';
import Histogram from '../Histogram';
import Bar from '../Bar';
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
  getScaleProps: VictoryChartProps;
  percent: boolean;
}

/**
 * Data structure for drawing one CandleChart based on one site
 * {candles = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
      { x: 3, open: 4, close: 9, high: 12, low: 0 }, 
    ];}
 */
interface CandleChart {
  candles: Array<Candle>;
  color: string;
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
 * @param percent a boolen for special logic when percent is used.
 * @returns a Histogram object containing all data for drawing a BarChart.
 */
function getBarChartData(
  site: string,
  metric: string,
  color: string,
  histogramData: any,
  percent: boolean
): Histogram {
  /**
   * Make sure corret color is retrived from Legends component
   */

  const histogram: Histogram = { bars: [] };
  const jsonData = JSON.parse(histogramData.get(site));

  const metricData = jsonData ? jsonData[metric]?.data : null;

  // Should be total number of buckets for using percent, else it should be 1
  let factorY = 1;
  if (percent) {
    metricData?.forEach((bar: any) => {
      factorY += bar.count;
    });
    factorY = (factorY - 1) / 100;
  }

  metricData?.forEach((bar: any) => {
    histogram.bars.push({
      x: String(bar.length),
      y: bar.count / factorY,
      fill: color,
    });
    // }
  });
  return histogram;
}

/**
 * getCandleChartData parse and get the data for the correct metric and sites.
 *
 * @param metrics a string array with the name of the metrics to show in the candlechart.
 * example 'getPatient'
 * @param site a string with the name of the site to get data from
 * @param boxDiagramData data from backend.
 * @param siteProps map ecah siteKey to a color
 * @returns a data structure in correct format to paint a candleChart.
 */
function getCandleChartData(
  metrics: Array<string>, // should be a metric array
  site: string,
  boxDiagramData: Map<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  siteProps: Map<string, Site> // used later when structure for candlechart is known.
): CandleChart {
  let siteColor = siteProps.get(site)?.color;
  if (!siteColor) siteColor = 'black';

  const candle: CandleChart = { candles: [], color: siteColor };

  metrics.forEach((metric) => {
    const siteData = boxDiagramData.get(site);
    if (!siteData) return;

    const jsonData = JSON.parse(siteData);
    const metricData = jsonData ? jsonData[metric] : null;
    if (!metricData) return;
    const maxHeight = 30000;
    /**
     * Todo: This should not be calculated in frontend.
     * Add new calculations in backend that does not include infinite when
     * calculating median,min,max(should probably still be inf),q1,q3. This fix is only to make boxplotsChart
     * readable when adding a victoryCandle with inf values
     */
    if (metricData.max > maxHeight) {
      metricData.max = maxHeight;
      // Remove closeLine
    }
    if (metricData.first_quartile > maxHeight) {
      metricData.first_quartile = maxHeight;
    }
    if (metricData.third_quartile > maxHeight) {
      metricData.third_quartile = maxHeight;
    }
    if (metricData.min > maxHeight) {
      metricData.min = maxHeight;
    }
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
function drawVictoryCandle(data: CandleChart, width: number): JSX.Element {
  return (
    <VictoryCandlestick
      key={JSON.stringify(data.candles)}
      labelComponent={<VictoryTooltip cornerRadius={0} pointerLength={0} />}
      labels={({ datum }) =>
        `min:${datum.low}
        \nmax:${datum.high}
        \nclose:${datum.close}
        \nopen:${datum.open}
        \nmean:${'30'}`
      }
      candleWidth={width}
      data={data.candles}
      style={{
        data: {
          fill: data.color,
          stroke: 'gray',
        },
      }}
    />
  );
}

/**
 *
 * Tick for x axis used in barChart
 *
 * @param props props for customTickLabel
 * @returns JSX element used to set tickLabel
 */
function CustomTickLabel(props: CustomTickLabelProps): JSX.Element {
  const { x, y, text, ticks = Array<string>() } = props;
  const padding = 1; // adjust the value to increase/decrease padding between labels

  const strokeWidth = 1;
  const color = 'grey';
  const lineLength = 20;
  const someOffset = 210;

  // let xValue = someValue*(index/ticks.length)+someOffset;
  const xValue = someOffset / ticks.length; // a bit fucky wucky, not tried with too many metrics or so, it is basiclly only gussed values. TODO: make more scientific!!!

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
/* eslint-disable */
interface CustomTickLabelProps extends TextProps {
  x?: number;
  y?: number;
  ticks?: Array<string>;
  text?: any; // Use the appropriate type based on your use case
  height?: number;

  
}
/* eslint-enable */

/**
 *  Tick for x axis used in boxplot
 *
 * @param props props for customTickLabel
 * @returns JSX element used to set tickLabel
 */
function CustomTickLabelBoxPlot(props: CustomTickLabelProps): JSX.Element {
  const { x, y, text } = props;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        angle="0"
        style={{
          fontSize: 40 - Math.sqrt(text.length),
          fill: '#404040',
          opacity: 0.05,
        }}
        x={450 / 2}
        y={0}
        dy={0}
        text={text}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        angle="90"
        style={{ fontSize: 10, fill: '#404040' }}
        x={40}
        y={0}
        dy={0}
        text={text}
      />
      {/* <line
        x1={55}
        x2={450}
        y1={-30}
        y2={-30}
        stroke={color}
        strokeWidth={strokeWidth}
      /> */}
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
    siteIds.forEach((id) =>
      histograms.set(id, String(fileHandler.GetBoxDiagram(id)))
    );
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
  const { metrics, sites, siteProps, fileHandler, getScaleProps } = props;
  const width = 10;
  const offsetPadding = 5;
  const victoryCandles: Array<JSX.Element> = [];
  const boxDiagramData = useBoxDiagrams(sites, fileHandler);

  if (fileHandler === undefined) {
    return <div />;
  }

  // For sites in props.site create victorycandles that contains props.sites
  // Loop through sites and build data for all marked metrics
  sites.forEach((site) => {
    const data: CandleChart = getCandleChartData(
      metrics,
      site,
      boxDiagramData,
      siteProps
    );
    victoryCandles.push(drawVictoryCandle(data, width));
  });

  const candleHeight = sites.length * (width + offsetPadding);
  const scale = 100;
  const graphHeight = (candleHeight + scale) * metrics.length;

  return (
    <VictoryChart
      data-testid="victory-chart"
      // this below is a start for the new
      horizontal
      height={graphHeight} // set this depending on the total amount of sites in buckets (ticks)
      {...getScaleProps}
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
            padding: 60,
            fontSize: 40 / metrics.length,
            angle: 45,
            // offset x-labels
            stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
          },
          axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
        }}
        tickLabelComponent={<CustomTickLabelBoxPlot height={candleHeight} />}
        tickFormat={(tick: any) => `${tick}`}
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
 * @param getScaleProps scale property
 * @returns a single victoryChart, <VictoryChart>...</VictoryChart>
 */
function drawHistogram(
  histograms: Array<Histogram>,
  metric: string,
  width: number,
  getScaleProps: VictoryChartProps
) {
  const formatTickDifference = (tick: any, index: number, ticksArray: any) => {
    if (index < ticksArray.length - 1) {
      if (tick === ticksArray[index + 1] - 1) {
        return `${tick} ms`;
      }
      const difference = `${tick} - ${Number(ticksArray[index + 1]) - 1} ms`;
      return difference;
    }
    return `${ticksArray[index]} ms - `;
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
      <VictoryChart {...getScaleProps}>
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
          tickLabelComponent={<CustomTickLabel />}
          tickFormat={(tick: any, index: number, ticks: any) =>
            formatTickDifference(tick, index, ticks)
          }
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
function useHistograms(
  siteIds: string[],
  fileHandler: any
): Map<string, string> {
  return useMemo(() => {
    const histograms: Map<string, string> = new Map();
    siteIds.forEach((id) => histograms.set(id, fileHandler.GetHistogram(id)));
    return histograms;
  }, [JSON.stringify(siteIds)]);
}

/**
 *Removes all bars that has y = 0
 *
 * @param barGraph Takes in a list of Histograms
 * @returns Returns a new list of Histograms where all bars that have y value 0
 * is removed
 */
function removeEmptyXValues(barGraph: Histogram[]): Array<Histogram> {
  /**
   * @param _barGraph List of histograms
   * @returns array containing all x values = 0
   */
  const getEmptyXValues = (_barGraph: Histogram[]): Set<String> => {
    const emptyXValues = new Set<String>();

    let nonEmptyBars: Bar[] = [];
    _barGraph.forEach((histogram) => {
      nonEmptyBars = nonEmptyBars.concat(
        histogram.bars.filter((bar: { y: number }) => bar.y !== 0)
      );
    });
    _barGraph.forEach((histogram) => {
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

  const removeEmptyXValuesFromHistograms = (
    oldBarGraph: Histogram[],
    emptyXValues: Set<String>
  ): Histogram[] => {
    const newBarGraph: Histogram[] = [];
    oldBarGraph.forEach((histogram: { bars: Bar[] }) => {
      const newHistogram: Histogram = new Histogram();
      let keepZero: boolean = true;
      histogram.bars.forEach((bar) => {
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
  const newBarGraph = removeEmptyXValuesFromHistograms(barGraph, emptyXvalues);
  return newBarGraph;
}

/**
 * Merges adjacent bars in each histogram of the barGraph array if their width is smaller than a threshold.
 *
 * @param barGraph An array of Histogram objects to be processed.
 * @param graphWidth The width of the graph in pixels.
 * @param sites A list of sites.
 * @returns A new array of Histogram objects with merged bars.
 */
function mergeXvalues(
  barGraph: Array<Histogram>,
  graphWidth: number,
  sites: Array<String>
): Array<Histogram> {
  let width = graphWidth / (numberOfXvalues(barGraph) * sites.length);

  const tooSmallWidth = 6; // target width of single bars
  const maxLoopCount = 50; // a fail safe in case something goes wrong
  let loopCount = 0;
  if (width >= tooSmallWidth) {
    return barGraph;
  }

  const smallerHistogram = (mergeCount: number, oldHistogram: Histogram) => {
    const newHistogram: Histogram = new Histogram([]);
    oldHistogram.bars.forEach((bar, i) => {
      const newIndex = Math.floor(i / mergeCount);

      if (newHistogram.bars[newIndex] === undefined) {
        newHistogram.bars.push(new Bar(bar.x, bar.y, bar.fill)); // bar.fill causes unexpected colors at weird times
      } else {
        newHistogram.bars[newIndex].y += bar.y;
      }
    });
    return newHistogram;
  };

  let mergeAmount = 1; // start merge amount
  while (width < tooSmallWidth) {
    const newBarGraph: Array<Histogram> = [];

    const currentMergeAmount = mergeAmount; // to avoid the 'eslint problem' no-func-loop
    barGraph.forEach((histogram) => {
      const newHistogram = smallerHistogram(currentMergeAmount, histogram);
      newBarGraph.push(newHistogram);
    });

    if (loopCount > maxLoopCount) {
      console.warn(
        '----------------------WARNING REACHED LOOP MAX!----------------------'
      );
      return newBarGraph;
    }
    loopCount += 1;
    mergeAmount += 1;
    width = graphWidth / (numberOfXvalues(newBarGraph) * sites.length);
    if (width >= tooSmallWidth) {
      return newBarGraph;
    }
  }
  return barGraph; // will never happen
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
  const { metrics, sites, siteProps, getScaleProps, percent } = props;
  const { fileHandler } = props;

  const [barGraphList, setBarGraphList] = useState<any[]>([]);

  const histogramData = useHistograms(sites, fileHandler);

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
          histogramData,
          percent
        );
        barGraph.push(data);
      });
      barGraph = removeEmptyXValues(barGraph);
      barGraph = mergeXvalues(barGraph, graphWidth, sites);
      const width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
      newBarGraphList.push(
        drawHistogram(barGraph, metric, width, getScaleProps)
      );
    });
    setBarGraphList(newBarGraphList);
  }, [fileHandler, metrics, siteProps, sites]);

  return <div data-testid="barchart">{barGraphList}</div>;
}
