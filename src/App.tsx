/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Menu from './components/Menu';
import './App.css';
import SectraTheme from './components/SectraTheme';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="App mui-theme">
      <SectraTheme>
        <Menu />
      </SectraTheme>
    </div>
  );
}

export default App;
