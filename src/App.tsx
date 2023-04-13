/**
 * @file Contains the App top level component.
 */

import React from 'react';

import SectraTheme from './components/SectraTheme';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';

import './App.css';
import { BoxPlotChart, BarChart } from './components/Charts';

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
    <div className="App mui-theme">
      <div className="App">
        <p className="read-the-docs">
          Viktor & Nils is currently testing, shit will break.
        </p>
        <BarChart
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
        />
        <div style={{ display: 'flex' }}>
          <BoxPlotChart
          metrics={['getPatient', 'getBucket']}
          sites={['stockholm', 'linköping']}
        />

          <div
            style={{
              alignContent: 'center',
              flexDirection: 'column',
              display: 'flex',
              backgroundColor: 'grey',
            }}
          >
            <GraphComponent />
            <InfoboxComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
