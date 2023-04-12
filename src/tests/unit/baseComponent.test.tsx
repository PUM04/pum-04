/**
 * @file Contains tests for the basecomponent
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import {
  InfoboxComponent,
  GraphComponent,
} from '../../components/BaseComponent';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    render(<GraphComponent />);
    render(<InfoboxComponent />);
  });

  it('should render graphComponent', async () => {
    await screen.findByTestId('graph-component');
  });

  it('should render graphComponent', async () => {
    await screen.findByTestId('infobox-component');
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
