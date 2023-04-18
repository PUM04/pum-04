/**
 * @file Contains the App top level component.
 */
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { useWasm } from './hooks/wasm';
import FileHandlerModule from './cpp/file_handler';
import './App.css';
import SectraTheme from './components/SectraTheme';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [fileHandler, setFileHandler] = useState();

  const fileHandlerModule = useWasm(FileHandlerModule)

  useEffect(() => {
    if (fileHandlerModule) {
      setFileHandler(new fileHandlerModule.FileHandler());
    }
  }, [fileHandlerModule]);

  return (
    <div className="App mui-theme">      
      <SectraTheme>
        <div style={{ display: 'flex' }}>
          <Layout fileHandler={fileHandler} />
        </div>
      </SectraTheme>
    </div>
  );
}

export default App;
