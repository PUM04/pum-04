/**
 * @file Contains the App top level component.
 */
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { positions, sizing } from '@mui/systems';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DragAndDropzone from './components/DragAndDropzone';
import Menu from './components/Menu';
import Layout from './components/Layout'
import './App.css';

/**
 * Top level component.
 *
 * @returns top level component
 */
function App(): JSX.Element {
  return <Layout />;
}

export default App;
