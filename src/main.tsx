/**
 * @file Contains React root element.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import PersistentDrawerLeft from './components/menu'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PersistentDrawerLeft />
  </React.StrictMode>
);
