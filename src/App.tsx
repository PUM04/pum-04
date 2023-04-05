/**
 * @file Contains the App top level component.
 */
import React from 'react';

import './App.css';

import { BoxPlotChart, BarChart, HistChart,GroupTest } from './components/Charts';

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
  const test = [
    { x: 1, y: 7 ,fill:"green"},
    { x: 2, y: 9, fill: "blue" },
    { x: 3, y: 4,fill:"brown" },
    { x: 13, y: 3,fill:"red" },
    
  ]
  console.log("afsefsef");
  return (
    <div className="App">
      <p className="read-the-docs">
        Viktor & Nils is currently testing, shit will break.
      </p>
      {/*
      <BoxPlotChart />
      <BarChart data = {test} />
      <GroupTest data ={test}/>
      */
     
      }
     
     <BarChart metrics = {["m1","m2"]} />
     
      
      
    </div>
  );
}

export default App;
