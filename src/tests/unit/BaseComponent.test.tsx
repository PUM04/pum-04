/**
 * @file Contains tests for the Base-component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { SiteProperties } from '../../components/SitePropetiesInterface';

import {
  InfoboxComponent,
  GraphComponent,
} from '../../components/BaseComponent';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    const testmap = new Map<string, SiteProperties>();
    render(<GraphComponent siteProps={testmap} fileHandler={null} />);
    render(<InfoboxComponent />);
  });

  // Tshould render
  it('should render graphComponent', async () => {
    await screen.findByTestId('graph-component');
  });

  // Tshould render
  it('should render graphComponent', async () => {
    await screen.findByTestId('infobox-component');
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
