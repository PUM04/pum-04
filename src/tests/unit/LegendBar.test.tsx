/**
 * @file Contains tests for the LegendBar component
 */
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

  it('should render legendBar', async () => {
    await screen.findByTestId('legendBar-component');
  });

  it('should render legend', async () => {
    await screen.findAllByTestId('legend-component');
  });

  afterEach(() => {
    cleanup();
  });
});
