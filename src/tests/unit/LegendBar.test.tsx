import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import LegendBar from '../../components/LegendBar';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    const sites = [
      { name: 'first', color: 'red', enabled: true },
      { name: 'second', color: 'blue', enabled: true },
      { name: 'third', color: 'orange', enabled: true },
    ];
    render(<LegendBar sites={sites} />);
  });

  // Tshould render
  it('should render legendBar', async () => {
    const legends = await screen.findByTestId('legends-component');
  });

  it('should render legend', async () => {
    const legend = await screen.findAllByTestId('legend-component');
  });

  afterEach(() => {
    cleanup();
  });
});
