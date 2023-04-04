/**
 * @file Contains the App top level component.
 */
import React from 'react';

import './App.css';

import { BoxPlotChart, BarChart, HistChart } from './components/Charts';

/**
 * Top level component.
 *
 * @returns top level component
 */

/**
 * App funct
 *
 * @returns The app :)
 */
function App(): JSX.Element {
  return (
    <div className="App">
      <p className="read-the-docs">
        Viktor & Nils is currently testing, shit will break.
      </p>
      <BoxPlotChart />
      <BarChart />
      <HistChart />
    </div>
  );
}

export default App;
