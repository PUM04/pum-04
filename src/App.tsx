/**
 * @file Contains the App top level component.
 */
import React from 'react';
import Layout from './components/Layout';
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
        <Layout />
      </SectraTheme>
    </div>
  );
}

export default App;
