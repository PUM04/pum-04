/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DragAndDropzone from './components/DragAndDropzone';
import './App.css';
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
      <div>
        <p>Uploaded files: {JSON.stringify(files)}</p>
        <DragAndDropzone setter={setFiles} value={files} />
      </div>
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
        <Button color="primary" type="button">
          Just a visual MUI button
        </Button>
      </div>
    </div>
  );
}

export default App;
