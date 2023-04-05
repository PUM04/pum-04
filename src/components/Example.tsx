/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';

import '../App.css';
import { useWasm } from '../hooks/wasm';
import CalculatorModule from '../cpp/Calculator';

/**
 * Top level component.
 *
 * @returns top level component
 */
function Example(): JSX.Element {
  const [count, setCount] = useState(0);

  const calcModule = useWasm(CalculatorModule);

  return (
    <div className="App">
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

export default Example;
