/**
 * @file Contains the App top level component.
 */

import React from 'react';
import './App.css';
import { BoxPlotChart, BarChart } from './components/Charts';
import SectraTheme from './components/SectraTheme';

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
  console.log('afsefsef');
  return (
    <div className="App mui-theme">
      <SectraTheme>
        (
    <div className="App">
      <p className="read-the-docs">
        Viktor & Nils is currently testing, shit will break.
      </p>
      <BarChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
      />
      <BoxPlotChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping']}
      />
    </div>
  )
      </SectraTheme>
    </div>
  );
}

export default App;
