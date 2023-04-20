/**
 * @file Contains tests for the Base-component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import {
  InfoboxComponent,
  BarGraphComponent,
  BoxGraphComponent,
} from '../../components/BaseComponent';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    render(
      <BarGraphComponent metrics={['hej']} sites={['hej']} fileHandler={null} />
    );
    render(
      <BoxGraphComponent metrics={['hej']} sites={['hej']} fileHandler={null} />
    );
    render(<InfoboxComponent />);
  });

  // Should render
  it('should render BarGraphComponent', async () => {
    await screen.findByTestId('bargraph-component');
  });

  // Should render
  it('should render BoxGraphComponent', async () => {
    await screen.findByTestId('boxgraph-component');
  });

  // Should render
  it('should render infoBoxComponent', async () => {
    await screen.findByTestId('infobox-component');
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
