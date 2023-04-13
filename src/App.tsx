/**
 * @file Contains the App top level component.
 */

import React from 'react';

import SectraTheme from './components/SectraTheme';
import Menu from './components/Menu';
import { GraphComponent, InfoboxComponent } from './components/BaseComponent';

import './App.css';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="App mui-theme">
      <SectraTheme>
        <div style={{ display: 'flex' }}>
          <Menu />

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
      </SectraTheme>
    </div>
  );
}

export default App;
