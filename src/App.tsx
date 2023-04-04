/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';

import './App.css';

import {
  VictoryBoxPlot,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryBar,
  VictoryHistogram,
} from 'victory';
import { render } from 'react-dom';
import BoxPlotChart from './components/BoxPlot';

const vicData = [
  { x: 'site 1', y: [2, 3, 4, 4, 3, 10] },
  { x: 'site 2', y: [2, 3, 4, 4] },
  { x: 'site 3', y: [0, 3, 4, 4, 4, 3, 6] },
  { x: 'site 4', y: [0, 3, 6, 4, 5, 3, 6] },
  { x: 'site 5', y: [1, 2, 8, 4, 5, 3, 6] },
  { x: 'site 6', y: [0, 3, 9, 4, 5, 3, 7] },
  { x: 'site 7', y: [3, 2, 8, 5, 5, 3, 7] },
  { x: 'site 8', y: [0, 2, 8, 5, 5, 3, 7] },
  { x: 'site 9', y: [1, 2, 3, 5, 4, 4, 6] },
  { x: 'site 10', y: [2, 2, 3, 4, 4, 6, 6] },
];

const vicData2 = [
  { x: 1, y: 7, colorScale: 'red' },
  { x: 2, y: 9, colorScale: 'blue' },
  { x: 3, y: 4, colorScale: 'green' },
  { x: 13, y: 3, colorScale: 'yellow' },
];

const vicData3 = [{ x: 1 }, { x: 2 }, { x: 10 }];

const renderBoxPlotChart = (
  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
    <VictoryAxis
      dependentAxis
      label="Time for call"
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryAxis
      label="Site"
      tickValues={[vicData]}
      tickFormat={['Lin', 'Man', 'Stock', 'Tokyo']}
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryBoxPlot
      data={vicData}
      maxLabels
      maxLabelComponent={<VictoryLabel dx={-10} dy={-10} textAnchor="middel" />}
      style={{
        min: { stroke: 'red' },
        max: { stroke: 'green' },
        q1: { fill: 'orange' },
        q3: { fill: 'red' },
        median: { stroke: 'black', strokeWidth: 1 },
        maxLabels: { fill: 'orange' },
      }}
    />
  </VictoryChart>
);

const renderBarChart = (
  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
    <VictoryAxis
      dependentAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryBar
      data={[
        { x: 1, y: 7, colorScale: 'red' },
        { x: 2, y: 9, colorScale: 'blue' },
        { x: 3, y: 4, colorScale: 'green' },
        { x: 13, y: 3, colorScale: 'yellow' },
      ]}
      style={{
        data: {
          fill: ({ d }) => d.colorScale,
        },
      }}
    />
  </VictoryChart>
);

const renderHistChart = (
  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
    <VictoryAxis
      dependentAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
      }}
    />
    <VictoryHistogram
      style={{
        data: {
          fill: 'orange',
          stroke: 'gray',
          strokeWidth: 1,
          strokeOpacity: 0.7,
        },
      }}
      binSpacing={10}
      bins={[0, 2, 5, 10]}
      data={vicData3}
    />
  </VictoryChart>
);

/**
 * Top level component.
 *
 * @returns top level component
 */

/**
 *
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [data, setData] = useState('');

  const dataForPlot = () => {
    setData('This is a test');
  };

  return (
    <div className="App">
      <p className="read-the-docs">
        Nils is currently testing, shit will break.
      </p>
      {renderBoxPlotChart}
      {renderBarChart}
      {renderHistChart}
    </div>
  );
}

export default App;
