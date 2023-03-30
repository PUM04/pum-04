/**
 * @file Contains the App top level component.
 */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import reactLogo from './assets/react.svg';
import './App.css';
import { useWasm } from './hooks/wasm';
import CalculatorModule from './cpp/Calculator';
import { Container } from '@mui/material';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const calcModule = useWasm(CalculatorModule);

  return (
    <div
      style={{
        margin: '5%',
        maxWidth: '100vw',
      }}
    >
      <Box sx={{ flexDirection: 'column', display: 'inline-flex' }}>
        <Button style={{ color: 'primary', width: '100%' }}>
          box 1 knapp 1
        </Button>
        <Button style={{ color: 'primary' }}>box 1 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 1 knapp 3</Button>
      </Box>

      <Box
        sx={{
          flexDirection: 'row',
          display: 'inline-flex',
          flexWrap: 'wrap',
        }}
      >
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 1</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 2</Button>
        <Button style={{ color: 'primary' }}>box 2 knapp 3</Button>
      </Box>
    </div>

    // <div className="App">
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    //       <img src="/vite.svg" className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank" rel="noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button
    //       type="button"
    //       onClick={() => {
    //         setCount(() => {
    //           if (count >= 10) {
    //             return new calcModule.Calculator().subtract(count, count);
    //           }
    //           return calcModule.increment(count);
    //         });
    //       }}
    //     >
    //       count is {count}
    //     </button>
    //     <Button
    //       color="secondary"
    //       type="button"
    //       onClick={() => setCount((currentCount) => currentCount + 1)}
    //     >
    //       count is {count}
    //     </Button>
    //     <Button color="primary" type="button">
    //       ' Just a visual MUI button'
    //     </Button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </div>
  );
}

export default App;
