/**
 * @file Contains the App top level component.
 */

import Box from '@mui/material/Box';
import { GraphComponent, InfoboxComponent } from './components/basecomponent';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DragAndDropzone from './components/DragAndDropzone';
import './App.css';
import { useWasm } from './hooks/wasm';
import FileHandlerModule from './cpp/FileHandler';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileHandler, setFileHandler] = useState();
  const [filereader, setFileReader] = useState(new FileReader());

  const fileHandlerModule = useWasm(FileHandlerModule);

  useEffect(() => {
    if (fileHandlerModule) {
      setFileHandler(new fileHandlerModule.FileHandler());
    }
  }, [fileHandlerModule]);

  // Start reading the first file
  if (files.length > 0 && filereader.readyState !== FileReader.LOADING) {
    filereader.readAsText(files[files.length - 1]);
  }

  filereader.onload = () => {
    // Send the file to the backend
    fileHandler.add_file(
      filereader.result as string,
      files[files.length - 1].name
    );
    files.pop();

    // Continue reading the rest of the files
    if (files.length > 0) {
      filereader.readAsText(files[files.length - 1]);
    } else {
      // Link the files in the backend
      fileHandler.compute_files();
    }
  };
  filereader.onabort = () => console.log('file reading was aborted');
  filereader.onerror = () => console.log('file reading has failed');

  // -------------------- FileReader example --------------------
  return (
    <div className="App">
      <div className="grid-container">
        meny? kan ta bort
        <Box
          sx={{
            flexDirection: 'column',
            display: 'inline-flex',
            backgroundColor: 'grey',
          }}
        >
          <GraphComponent />
          <InfoboxComponent />
        </Box>
      </div>

      <div>
        <p>Uploaded files: {JSON.stringify(files)}</p>
        <DragAndDropzone setter={setFiles} value={files} />
      </div>
      {/* 
      Everything under here test webassembly and will not stay till final product 
      */}
      <div className="card">
        <button
          data-testid="count-button"
          type="button"
          onClick={() => {
            setCount(() => {
              if (count >= 10) {
                return 0;
              }
              return count + 1;
            });
          }}
        >
          count is {count}
        </button>
        <Button
          color="secondary"
          type="button"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          count is {count}
        </Button>

        <Button color="primary" type="button">
          Just a visual MUI button
        </Button>
      </div>
    </div>
  );
}

export default App;
