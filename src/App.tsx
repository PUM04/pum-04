/**
 * @file Contains the App top level component.
 */

import React from 'react';
import Menu from './components/Menu';
import './App.css';
import CreateSectraTheme from './components/SectraTheme';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return (
    <div className="App mui-theme">
      <CreateSectraTheme>
        <Menu />
      </CreateSectraTheme>
    </div>
  );
}

export default App;
