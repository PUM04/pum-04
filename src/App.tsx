/**
 * @file Contains the App top level component.
 */
import React, { useState, useEffect } from 'react';

import { useWasm } from './hooks/wasm';
import FileHandlerModule from './cpp/file_handler';

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
  const [files, setFiles] = useState<File[]>([]);
  const [fileHandler, setFileHandler] = useState();
  const [filereader] = useState(new FileReader());

  const fileHandlerModule = useWasm(FileHandlerModule);

  useEffect(() => {
    if (fileHandlerModule) {
      setFileHandler(new fileHandlerModule.FileHandler());
    }
  }, [fileHandlerModule]);

  return (
    <div className="App mui-theme">
      <SectraTheme>
        <div style={{ display: 'flex' }}>
          <Menu fileHandler={fileHandler}/>
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
