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
  VictoryLabel
} from 'victory';

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
}

class Bar{
  public x: string;
  public y: number;
  public fill: string;

  constructor(x:string = "0",y:number = 0,fill = "red"){
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
}

class Histogram{
  public bars: Array<Bar>;

  constructor(bars: Array<Bar> = [new Bar()]){
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
 * {candels = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
      { x: 3, open: 4, close: 9, high: 12, low: 0 }, 
    ];}
 */
interface CandleChart {
  candels: Array<Candle>;
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
 * getBarChartData get the data from backend to paint a BarChartData.
 *
 * @param site what site to get data from.
 * @param metric what metric to get data from.
 * @returns a Histogram object containing all data for drawing a BarChart.
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
      { x: '1', y: 5555, fill: 'yellow' },
      { x: '2', y: 1, fill: 'yellow' },
      { x: '3', y: 0, fill: 'yellow' },
      { x: '4', y: 0, fill: 'yellow' },
      { x: '5', y: 0, fill: 'yellow' },
      { x: '6', y: 0, fill: 'yellow' },
      { x: '7', y: 0, fill: 'yellow' },
      { x: '8', y: 0, fill: 'yellow' },
      { x: '9', y: 0, fill: 'yellow' },
     { x: '10', y: 0, fill: 'yellow' },
     { x: '20', y: 0, fill: 'yellow' },
     { x: '30', y: 0, fill: 'yellow' },
     { x: '40', y: 0, fill: 'yellow' },
     { x: '50', y: 1, fill: 'yellow' },
     { x: '60', y: 1, fill: 'yellow' },
     { x: '70', y: 1, fill: 'yellow' },
     { x: '80', y: 1, fill: 'yellow' },
     { x: '90', y: 1, fill: 'yellow' },
    { x: '100', y: 1, fill: 'yellow' },
    { x: '200', y: 1, fill: 'yellow' },
    { x: '300', y: 1, fill: 'yellow' },
    { x: '400', y: 1, fill: 'yellow' },
    { x: '500', y: 6, fill: 'yellow' },
  { x: '600', y: 542, fill: 'yellow' },
  { x: '700', y: 500, fill: 'yellow' },
 { x: '800', y: 605, fill: 'yellow' },
  { x: '900', y: 638, fill: 'yellow' },
  { x: '1000', y: 12, fill: 'yellow' },
 { x: '1500', y: 120, fill: 'yellow' },
   { x: '2000', y: 0, fill: 'yellow' },
   { x: '2500', y: 0, fill: 'yellow' },
   { x: '3000', y: 0, fill: 'yellow' },
   { x: '3500', y: 0, fill: 'yellow' },
  { x: '4000', y: 21, fill: 'yellow' },
   { x: '4500', y: 2, fill: 'yellow' },
  { x: '5000', y: 10, fill: 'yellow' },
  { x: '5500', y: 19, fill: 'yellow' },
   { x: '6000', y: 0, fill: 'yellow' },
   { x: '6500', y: 0, fill: 'yellow' },
   { x: '7000', y: 0, fill: 'yellow' }
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
      { x: '1', y: 555, fill: 'blue' },
      { x: '2', y: 0, fill: 'blue' },
      { x: '3', y: 0, fill: 'blue' },
      { x: '4', y: 0, fill: 'blue' },
      { x: '5', y: 0, fill: 'blue' },
      { x: '6', y: 0, fill: 'blue' },
      { x: '7', y: 0, fill: 'blue' },
      { x: '8', y: 0, fill: 'blue' },
      { x: '9', y: 0, fill: 'blue' },
     { x: '10', y: 1, fill: 'blue' },
     { x: '20', y: 1, fill: 'blue' },
     { x: '30', y: 1, fill: 'blue' },
     { x: '40', y: 1, fill: 'blue' },
     { x: '50', y: 1, fill: 'blue' },
     { x: '60', y: 1, fill: 'blue' },
     { x: '70', y: 1, fill: 'blue' },
     { x: '80', y: 1, fill: 'blue' },
     { x: '90', y: 1, fill: 'blue' },
    { x: '100', y: 1, fill: 'blue' },
    { x: '200', y: 1, fill: 'blue' },
    { x: '300', y: 1, fill: 'blue' },
    { x: '400', y: 1, fill: 'blue' },
    { x: '500', y: 1, fill: 'blue' },
  { x: '600', y: 502, fill: 'blue' },
  { x: '700', y: 500, fill: 'blue' },
  { x: '800', y: 405, fill: 'blue' },
  { x: '900', y: 608, fill: 'blue' },
  { x: '1000', y: 12, fill: 'blue' },
 { x: '1500', y: 120, fill: 'blue' },
   { x: '2000', y: 0, fill: 'blue' },
   { x: '2500', y: 0, fill: 'blue' },
   { x: '3000', y: 0, fill: 'blue' },
   { x: '3500', y: 0, fill: 'blue' },
  { x: '4000', y: 21, fill: 'blue' },
   { x: '4500', y: 2, fill: 'blue' },
  { x: '5000', y: 10, fill: 'blue' },
  { x: '5500', y: 19, fill: 'blue' },
   { x: '6000', y: 0, fill: 'blue' },
   { x: '6500', y: 0, fill: 'blue' },
   { x: '7000', y: 0, fill: 'blue' }
    ];
  } else if (site === 'linköping' && metric === 'getBucket') {
    data.bars = [
      { x: '1', y: 0, fill: 'green' },
      { x: '2', y: 0, fill: 'green' },
      { x: '3', y: 1, fill: 'green' },
      { x: '4', y: 0, fill: 'green' },
      { x: '5', y: 0, fill: 'green' },
      { x: '6', y: 1, fill: 'green' },
      { x: '7', y: 1, fill: 'green' },
      { x: '8', y: 1, fill: 'green' },
      { x: '9', y: 1, fill: 'green' },
      { x: '10', y: 1, fill: 'green' },
      { x: '20', y: 1, fill: 'green' },
      { x: '30', y: 1, fill: 'green' },
      { x: '40', y: 1, fill: 'green' },
      { x: '50', y: 1, fill: 'green' },
      { x: '60', y: 1, fill: 'green' },
      { x: '70', y: 1, fill: 'green' },
      { x: '80', y: 1, fill: 'green' },
      { x: '90', y: 1, fill: 'green' },
      { x: '100', y: 1, fill: 'green' },
      { x: '200', y: 1, fill: 'green' },
      { x: '300', y: 1, fill: 'green' },
      { x: '400', y: 1, fill: 'green' },
      { x: '500', y: 1, fill: 'green' },
      { x: '600', y: 512, fill: 'green' },
      { x: '700', y: 500, fill: 'green' },
      { x: '800', y: 605, fill: 'green' },
      { x: '900', y: 608, fill: 'green' },
      { x: '1000', y: 12, fill: 'green' },
     { x: '1500', y: 120, fill: 'green' },
      { x: '2000', y: 0, fill: 'green' },
      { x: '2500', y: 0, fill: 'green' },
      { x: '3000', y: 0, fill: 'green' },
      { x: '3500', y: 0, fill: 'green' },
     { x: '4000', y: 21, fill: 'green' },
      { x: '4500', y: 2, fill: 'green' },
     { x: '5000', y: 10, fill: 'green' },
     { x: '5500', y: 19, fill: 'green' },
      { x: '6000', y: 0, fill: 'green' },
      { x: '6500', y: 0, fill: 'green' },
      { x: '7000', y: 0, fill: 'green' }
    ];
  } else if (site === 'manchester' && metric === 'getPatient') {
    data.bars = [
  { x: '1', y: 0, fill: 'green' },
  { x: '2', y: 1, fill: 'green' },
  { x: '3', y: 2, fill: 'green' },
  { x: '4', y: 0, fill: 'green' },
  { x: '5', y: 0, fill: 'green' },
  { x: '6', y: 6, fill: 'green' },
  { x: '7', y: 0, fill: 'green' },
  { x: '8', y: 4, fill: 'green' },
  { x: '9', y: 4, fill: 'green' },
  { x: '10', y: 7, fill: 'green' },
  { x: '20', y: 0, fill: 'green' },
  { x: '30', y: 0, fill: 'green' },
  { x: '40', y: 0, fill: 'green' },
  { x: '50', y: 8, fill: 'green' },
  { x: '60', y: 9, fill: 'green' },
  { x: '70', y: 0, fill: 'green' },
  { x: '80', y: 0, fill: 'green' },
  { x: '90', y: 0, fill: 'green' },
  { x: '100', y: 0, fill: 'green' },
  { x: '200', y: 0, fill: 'green' },
  { x: '300', y: 0, fill: 'green' },
  { x: '400', y: 0, fill: 'green' },
  { x: '500', y: 0, fill: 'green' },
  { x: '600', y: 512, fill: 'green' },
  { x: '700', y: 500, fill: 'green' },
  { x: '800', y: 605, fill: 'green' },
  { x: '900', y: 608, fill: 'green' },
  { x: '1000', y: 12, fill: 'green' },
  { x: '1500', y: 120, fill: 'green' },
  { x: '2000', y: 0, fill: 'green' },
  { x: '2500', y: 0, fill: 'green' },
  { x: '3000', y: 0, fill: 'green' },
  { x: '3500', y: 0, fill: 'green' },
  { x: '4000', y: 21, fill: 'green' },
  { x: '4500', y: 2, fill: 'green' },
  { x: '5000', y: 10, fill: 'green' },
  { x: '5500', y: 19, fill: 'green' },
  { x: '6000', y: 0, fill: 'green' },
  { x: '6500', y: 0, fill: 'green' },
  { x: '7000', y: 0, fill: 'green' }
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
      { x: '1', y: 0, fill: 'red' },
      { x: '2', y: 0, fill: 'red' },
      { x: '3', y: 400, fill: 'red' },
      { x: '4', y: 400, fill: 'red' },
      { x: '5', y: 300, fill: 'red' },
      { x: '6', y: 0, fill: 'red' },
      { x: '7', y: 0, fill: 'red' },
      { x: '8', y: 300, fill: 'red' },
      { x: '9', y: 0, fill: 'red' },
     { x: '10', y: 0, fill: 'red' },
     { x: '20', y: 0, fill: 'red' },
     { x: '30', y: 0, fill: 'red' },
     { x: '40', y: 0, fill: 'red' },
     { x: '50', y: 0, fill: 'red' },
     { x: '60', y: 0, fill: 'red' },
     { x: '70', y: 0, fill: 'red' },
     { x: '80', y: 0, fill: 'red' },
     { x: '90', y: 0, fill: 'red' },
    { x: '100', y: 0, fill: 'red' },
    { x: '200', y: 0, fill: 'red' },
    { x: '300', y: 0, fill: 'red' },
    { x: '400', y: 0, fill: 'red' },
    { x: '500', y: 0, fill: 'red' },
  { x: '600', y: 512, fill: 'red' },
  { x: '700', y: 500, fill: 'red' },
  { x: '800', y: 605, fill: 'red' },
  { x: '900', y: 608, fill: 'red' },
  { x: '1000', y: 12, fill: 'red' },
 { x: '1500', y: 120, fill: 'red' },
   { x: '2000', y: 0, fill: 'red' },
   { x: '2500', y: 0, fill: 'red' },
   { x: '3000', y: 0, fill: 'red' },
   { x: '3500', y: 0, fill: 'red' },
  { x: '4000', y: 21, fill: 'red' },
   { x: '4500', y: 2, fill: 'red' },
  { x: '5000', y: 10, fill: 'red' },
  { x: '5500', y: 19, fill: 'red' },
   { x: '6000', y: 0, fill: 'red' },
   { x: '6500', y: 0, fill: 'red' },
   { x: '7000', y: 0, fill: 'red' }
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
function getCandleChartData(metrics: Array<string>, site: string): CandleChart {
  const data: CandleChart = { candels: [] };
  /**
   * Todo- At the moment this function only contains dummy data.
   * Implement code to get data from backend
   * Make sure correct color is retrived from Legends component
   *
   *  This is the idea:
   *  - json = get_box_diagram( string site_id) to get data from backend. Returns a json string.
   *  - json = jsonify(json)
   *  - json["getpatient"]["avrage"]
   *    or json["getPatient"]
   *  - iterate over to create correct data structure.
   *
   *  Candelstick to boxplot translation.
   *  OPEN is first_quartile
   *  close is third_quartile
   *  max is high
   *  min is low
   */


  if (
    site === 'linköping'
  ) {
    data.candels = [
      { x: 'getBucket', open: 5, close: 10, high: 22, low: 0}, // s1
      { x: 'getPatient', open: 10, close: 15, high: 20, low: 5 }, // s2
      { x: 'ma2', open: 8, close: 11, high: 13, low: 2 }, // s3
      { x: 'mb3', open: 12, close: 15, high: 16, low: 6 }, // s3

    ];
  }
  if (site === 'stockholm') {
    data.candels = [
      { x: 'getBucket', open: 5, close: 10, high: 25, low: 1 },
      { x: 'mc4', open: 6, close: 8, high: 15, low: 3 },
      { x: 'md2', open: 4, close: 9, high: 12, low: 0}, // s2
    ];
  }
  if(site === "tokyo"){
    data.candels = [
      { x: 'getBucket', open: 5, close: 10, high: 25, low: 1 },
      { x: 'me4', open: 6, close: 8, high: 15, low: 3 },
      { x: 'mf2', open: 4, close: 9, high: 12, low: 0}, // s2
    ];
  }
  if(site === "manchester"){
    data.candels = [
      { x: 'getBucket', open: 15, close: 10, high: 25, low: 1 },
      { x: 'me4', open: 0, close: 2, high: 15, low: 0 },
      { x: 'mf2', open: 4, close: 9, high: 12, low: 0}, // s2
    ];
  }
  return data;
}

/**
 * Draws a single victoryCandle.
 *
 * @param data the data needed to create a victorycandle. Must be in the following format
 * data = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, 
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, 
    ];
 * @param width Is the fixed width of the candels in the chart. CandelRatio does not work in this case.
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
      data={
        data
      }
      style={{
        data: {
          fill: 'orange',
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
  const { metrics } = props;
  const { sites } = props;
  const width = 10;
  const offsetPadding = 5;
  const victoryCandles: Array<JSX.Element> = [];

  // For metrics in props.metrics skapa victorycandles som innehåller alla props.sites
  sites.forEach(site => {
    const data: CandleChart = getCandleChartData(metrics, site);
    victoryCandles.push(drawVictoryCandle(data.candels, width));

  });

  /**
   * TODO
   */
  function alignText(textToAlign:string){
    let xOffset: number = 0;
    let yOffset: number = 0;
    xOffset = textToAlign.length;
    yOffset = textToAlign.length;
    return `translate(${xOffset}, ${yOffset})`;
  }



  console.log('candles: ', victoryCandles);
  return (
    <VictoryChart data-testid="victory-chart">
      
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
            fontSize: 10,
            angle: 45,
            stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
          },
          axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
          
        }}
        //tickFormat={(tick:any, index:number, ticks:any) => `${tick}`}
      />
      <VictoryGroup offset={width + 1} domainPadding={{ x: offsetPadding}} >
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
      { x: '500', y: 20, fill: 'red' },
      { x: '600', y: 150, fill: 'red' },
      { x: '700', y: 200, fill: 'red' },
    ];
 * @param width width of a bar.
 * @returns a single VictoryBar.
 */
function drawVictoryBar(data: Array<Bar>, width: number): JSX.Element {
  return (
    <VictoryBar
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

  const formatTickDifference = (tick:any, index:number, ticksArray:any) => {
      if (index < ticksArray.length - 1) {
        if(tick == ticksArray[index + 1] - 1){
          return `${tick} ms`
        }
        else{
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
        style={{ textAlign: 'center', fontSize: 22, marginBottom: 0 }}
      >
        {metric}
      </p>
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
          style={{
            tickLabels: {
              fontSize: 8,
              transform: 'translate(0, 10)', // offset x-labels
              angle: 45, // tilt x labels
              stroke: 'gray', // Anyone who has a browser in dark mode needs the axis stroke in another color.
            },
            axis: { stroke: 'gray' }, // Anyone who has a browser in dark mode needs the axis stroke in another color.
          }
        }
        tickFormat={(tick:any, index:number, ticks:any) => formatTickDifference(tick, index, ticks)}
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
 * @param props :ChartProps contains list of metrics and list of sites.
 * @returns A list of victorycharts
 * [<VictoryChart>BarchartsArray</VictoryChart>,<VictoryChart>BarChartsArray</VictoryChart>]
 */
export function BarChart(props: ChartProps): JSX.Element {
  const { metrics } = props;
  const { sites } = props;
  const barGraphList: any = [];

  // This does not effect the actual graph width,
  // width of BarChart is based on parent container
  const graphWidth = 300;

  metrics.forEach((metric) => {
    let barGraph: Array<Histogram> = [];
    //let newBarGraph: Array<Histogram> = [];
    sites.forEach((site) => {
      const data: Histogram = getBarChartData(site, metric);
      barGraph.push(data);
   
    });
    if(true){
  
    barGraph = mergeXvalues(barGraph, graphWidth, sites);
    barGraph = removeEmptyXValues(barGraph);
   
   }
   else{
    barGraph = mergeXvalues(barGraph, graphWidth, sites);

   }

    const width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
    barGraphList.push(drawHistogram(barGraph, metric, width));
  });

  return <div>{barGraphList}</div>;
}

/**
 * 
 * @param barGraph 
 * @returns 
 */
function removeEmptyXValues(barGraph: Histogram[]): Array<Histogram>{
  
  const getEmptyXValues = (barGraph: Histogram[]) => {
    const emptyXValues = new Set();
   
    let nonEmptyBars: Bar[] = [];
    barGraph.forEach(histogram => {
      nonEmptyBars = histogram.bars.filter((bar: { y: number; }) => bar.y !== 0);
    });
    barGraph.forEach(histogram => {
      histogram.bars.forEach((bar: { y: number; x: string; }) => {
        if (bar.y === 0 && !nonEmptyBars.some((b: { x: string; }) => b.x === bar.x)) {
          emptyXValues.add(bar.x);
        }
      });
    });
    return emptyXValues;
  };
  
  const _removeEmptyXValues = (barGraph: any[], emptyXValues: Set<unknown>) => {
    let newBarGraph:Histogram[] = []; 
    barGraph.forEach((histogram: { bars: any[]; }) => {
     let newHistogram:Histogram = new Histogram();
      let keepZero:boolean = false; 
       histogram.bars.forEach((bar,i) => {

          if (emptyXValues.has(bar.x)){
            if(keepZero){
              newHistogram.bars.push(bar);
            }
            keepZero = false;
          }
          else{
            newHistogram.bars.push(bar);
            keepZero = true;
          }
       });
       newBarGraph.push(newHistogram);
    });
    console.log(newBarGraph);
    return newBarGraph;
  };

  const emptyXvalues = getEmptyXValues(barGraph);
  barGraph = _removeEmptyXValues(barGraph, emptyXvalues)
  return barGraph;
}


/**
 * Merges adjacent bars in each histogram of the barGraph array if their width is smaller than a threshold.
 * @param barGraph An array of Histogram objects to be processed.
 * @param graphWidth The width of the graph in pixels.
 * @param sites A list of sites.
 * @returns A new array of Histogram objects with merged bars.
 */
function mergeXvalues(barGraph:Array<Histogram>,graphWidth:any,sites:any):Array<Histogram>{
  
  let newBarGraph: Array<Histogram> = []; 
  let width = graphWidth / (numberOfXvalues(barGraph) * sites.length);
  
  const tooSmallWidth = 6; //target width of single bars
  const maxLoopCount = 50; // a fail safe in case something goes wrong
  let mergeAmount = 1; //start merge amount
  let loopCount = 0;
  

  if(width>=tooSmallWidth){
    console.log("no changes when running mergeXvalues()");
    return barGraph;
  }
  while(width<tooSmallWidth){
    newBarGraph = [];
    barGraph.forEach(histo => {
      let newHisto:Histogram = new Histogram([]);
    
      histo.bars.forEach((bar, i) => {
        const newIndex = Math.floor(i / mergeAmount);
      
        if (newHisto.bars[newIndex] === undefined) {
          newHisto.bars.push(new Bar(bar.x, bar.y, bar.fill));
        }
        else
        {
          newHisto.bars[newIndex].y += bar.y;
        }
      }
      
      );
      newBarGraph.push(newHisto);

      });

      if(loopCount>maxLoopCount){
        console.warn("----------------------WARNING REACHED LOOP MAX!----------------------");
        break;
      }
      loopCount +=1;
      mergeAmount += 1;
      width = graphWidth / (numberOfXvalues(newBarGraph) * sites.length);
    }
 
  return newBarGraph;
}
