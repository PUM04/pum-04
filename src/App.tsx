/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BoxPlot,
} from 'recharts';
import {
  VictoryBar,
  VictoryAxis,
  VictoryBoxPlot,
  VictoryChart,
  VictoryHistogram,
} from 'victory';
import reactLogo from './assets/react.svg';
import './App.css';

const data = [
  { name: 'Metric A', uv: 100, pv: 100, amt: 400 },
  { name: 'Metric B', uv: 200, pv: 200, amt: 200 },
  { name: 'Metric C', uv: 230, pv: 300, amt: 200 },
  { name: 'Metric D', uv: 300, pv: 430, amt: 500 },
  { name: 'Metric E', uv: 800, pv: 100, amt: 400 },
];

const hisData = [
  { x: 0 },
  { x: 1 },
  { x: 2 },
  { x: 3 },
  { x: 4 },
  { x: 5 },
  { x: 6 },
  { x: 7 },
  { x: 8 },
  { x: 9 },
  { x: 10 },
];

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

const renderBoxPlotChart = (
  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
    <VictoryAxis
      dependentAxis
      label="Time for call"
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5 },
      }}
    />
    <VictoryAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'gray' },
      }}
      label="Site"
    />
    <VictoryBoxPlot
      data={vicData}
      style={{
        min: { stroke: 'red' },
        max: { stroke: 'green' },
        q1: { fill: 'orange' },
        q3: { fill: 'orange' },
        median: { stroke: 'black', strokeWidth: 1 },
      }}
    />
  </VictoryChart>
);

const renderHistogram = (
  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
    <VictoryAxis
      dependentAxis
      label="Amount of calls"
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5 },
      }}
    />
    <VictoryAxis
      style={{
        axis: { strokeWidth: 2, stroke: 'gray' },
        tickLabels: { fontSize: 10, padding: 5, stroke: 'gray' },
      }}
      label="Time"
    />
    <VictoryHistogram
      data={hisData}
      bins={[0, 3, 7, 10, 12, 14]}
      labels={({ datum }) => `Bin count:\n ${datum.y}`}
    />
  </VictoryChart>
);

const renderBarChart = (
  <BarChart width={500} height={500} data={data}>
    <CartesianGrid stroke="#ccc" />
    <Bar type="monotone" dataKey="uv" fill="#8884d8" />
    <Bar type="monotone" dataKey="pv" fill="#82ca9d" />
    <Bar type="monotone" dataKey="amt" fill="#821a98" />
    <XAxis dataKey="name" />
    <YAxis />
  </BarChart>
);
const renderLineChart = (
  <LineChart width={500} height={500} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Bar type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {renderLineChart}
        {renderBarChart}
        {renderBoxPlotChart}
        {renderHistogram}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
