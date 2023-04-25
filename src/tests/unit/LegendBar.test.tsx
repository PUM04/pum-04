/**
 * @file Contains tests for the LegendBar component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import LegendBar from '../../components/LegendBar';
import { Site } from '../../components/SiteInterface';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    const testmap = new Map<string, Site>();
    testmap.set('stockholm', {
      color: 'red',
      enabled: true,
      name: 'stockholm',
    });
    testmap.set('manchester', {
      color: 'red',
      enabled: true,
      name: 'manchester',
    });
    testmap.set('tokyo', {
      color: 'black',
      enabled: true,
      name: 'tokyo',
    });
    testmap.set('linköping', {
      color: 'grey',
      enabled: true,
      name: 'linköping',
    });
    testmap.set('a;skld', {
      color: 'grey',
      enabled: false,
      name: 'a;skld',
    });

    render(<LegendBar siteProps={testmap} />);
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
