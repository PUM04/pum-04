/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg';
import './App.css';
import { useWasm } from './hooks/wasm';
import CalculatorModule from './cpp/Calculator';

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
        <Button
          color="secondary"
          type="button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          count is {count}
        </Button>
        <Button
          color="primary"
          type="button"
          onClick={() => {
            const reader = new FileReader();
            reader.onload = () => {
              const contents = reader.result;

            };
            let regexStart = /{method="/g
            let regexEnd = /{method="\w*/g
            let metrics: Map<String,Map<number,number>> = new Map<String,Map<number,number>>();
            var lines = "file".split('\n'); //"file" is dummy
            lines.forEach(element => {
              if(element.includes("{method=\"")){
                let metricName = element.substring(element.search(regexStart),element.search(regexEnd))
                let metricStats = new Map<number,number>();
                metrics.set(metricName,metricStats);
                //add entries to metricStats
              }
            });
          }}
        >
          Extract metrics
        </Button>
        <Button color="primary" type="button">
          Just a visual MUI button
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
