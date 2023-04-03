/**
 * @file Contains the App top level component.
 */
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DragAndDropzone from './components/DragAndDropzone';
import './App.css';
import { GraphComponent, InfoboxComponent } from './components/basecomponent';
import { useWasm } from './hooks/wasm';
import CalculatorModule from './cpp/Calculator';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const calcModule = useWasm(CalculatorModule);
  // -------------------- FileReader example --------------------
  const filereader = new FileReader();

  if (files.length > 0) filereader.readAsText(files[0]);

  filereader.onload = () => {
    console.log(`file contents read: ${filereader.result}`);
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
      {/*Everything under here test webassembly and will not stay till final product*/}
      <div className="card">
        <button
          type="button"
          onClick={() => {
            setCount(() => {
              if (count >= 10) {
                return new calcModule.Calculator().subtract(count, count);
              }
              return calcModule.increment(count);
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
      </div>
    </div>
  );
}

export default App;
