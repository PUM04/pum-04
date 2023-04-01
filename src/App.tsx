/**
 * @file Contains the App top level component.
 */
import { VictoryAxis, VictoryChart, VictoryHistogram } from 'victory';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg';
import './App.css';
import { useWasm } from './hooks/wasm';
import CalculatorModule from './cpp/Calculator';

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
/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const calcModule = useWasm(CalculatorModule);

  return (
    <div className="App">
      <div className="grid-container">
        <div className="sidebar">
          <div className="header">SandAHL</div>
          <div className="dropdown-menu">
            <button type="button">dropdown 1</button>
            <button type="button">dropdown 1</button>
          </div>
        </div>
        <div className="mainbar">
          <div className="legend">Legend </div>
          <div
            className="graph-window"
            style={{
              maxWidth: 800,
              marginTop: 50,
              marginLeft: 10,
              marginBottom: 10,
              marginRight: 60,
              backgroundColor: '#AECDEB',
            }}
          >
            graph window
            {renderHistogram}
          </div>

          <Button
            color="secondary"
            type="button"
            onClick={() => setCount((currentCount) => currentCount + 1)}
          >
            count is {count}
          </Button>
          <Button color="primary" type="button">
            Just a visual MUI button
          </Button>
          <button
            type="button"
            onClick={() => {
              setCount(() => {
                if (count >= 10) {
                  return new calcModule.Calculator().subtract(count, count);
                }
                return calcModule.increment(count);
              });
            }}
          >
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
