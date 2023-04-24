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
    const graphComponent = await screen.findByTestId('graph-component');
    expect(graphComponent).toBeVisible();
  });

  // Tshould render
  it('should render graphComponent', async () => {
    const InfoboxComponent = await screen.findByTestId('infobox-component');
    expect(InfoboxComponent).toBeVisible();
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
