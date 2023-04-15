/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Calculator from '../cpp/Calculator';

import '../App.css';
import { useWasm } from '../hooks/wasm';
/**
 * Top level component.
 *
 * @returns top level component
 */
function WASMExample(): JSX.Element {
  const [count, setCount] = useState(0);

  const calculatorModule = useWasm(Calculator);

  return (
    <div className="App">
      <div className="card">
        <button
          type="button"
          data-testid="count-button"
          onClick={() => {
            setCount(() => {
              if (count >= 10) {
                return new calculatorModule.Calculator().subtract(count, count);
              }
              return new calculatorModule.Calculator().add(count, 1);
            });
          }}
        >
          count is {count}
        </button>
        <Button color="primary" type="button">
          Just a visual MUI button
        </Button>
      </div>
    </div>
  );
}

export default WASMExample;
