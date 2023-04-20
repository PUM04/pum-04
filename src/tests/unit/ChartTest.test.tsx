/**
 * @file Contains basic tests for testing the chart component.
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Component to test
import { BoxPlotChart, BarChart } from '../../components/Charts';
import { SiteProperties } from '../../components/SitePropetiesInterface';

/**
 * Note that the tests below are very simple and an expansion of these test are needed in the future.
 * Especially with new features being integrated into the charts component.
 * Example of future tests are: color from legend component being correct, something with getting data from the back-end and looking for tickFormat and tickValues.
 */

describe('Test charts', () => {
  // Run this before each test
  beforeEach(() => {});
  // Maps each site key to a site name and a color

  it('Check if candleChart is rendered', async () => {
    const fakeSitePropMap = new Map<string, SiteProperties>();
    fakeSitePropMap.set('stockholm', {
      color: 'red',
      enabled: true,
      name: 'stockholm',
    });
    fakeSitePropMap.set('manchester', {
      color: 'red',
      enabled: true,
      name: 'manchester',
    });
    fakeSitePropMap.set('tokyo', {
      color: 'black',
      enabled: true,
      name: 'tokyo',
    });
    fakeSitePropMap.set('linköping', {
      color: 'grey',
      enabled: true,
      name: 'linköping',
    });
    render(
      <BoxPlotChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping']}
        siteProps={fakeSitePropMap}
      />
    );
    const candelChart = screen.getByTestId('victory-chart');
    expect(candelChart.nodeName === 'VictoryChart');
  });

  it('Check if histograms are rendered', async () => {
    const fakeSitePropMap = new Map<string, SiteProperties>();
    fakeSitePropMap.set('stockholm', {
      color: 'yellow',
      enabled: true,
      name: 'stockholm',
    });
    fakeSitePropMap.set('manchester', {
      color: 'pink',
      enabled: true,
      name: 'manchester',
    });
    fakeSitePropMap.set('tokyo', {
      color: 'black',
      enabled: true,
      name: 'tokyo',
    });
    fakeSitePropMap.set('linköping', {
      color: 'grey',
      enabled: true,
      name: 'linköping',
    });
    render(
      <BarChart
        metrics={['getPatient']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
        siteProps={fakeSitePropMap}
      />
    );

    const histogram = screen.getByTestId('graph-header');
    expect(histogram).toHaveTextContent('getPatient');

    render(
      <BarChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
        siteProps={fakeSitePropMap}
      />
    );
    const histograms = screen.getAllByTestId('graph-header');
    expect(histograms[2]).toHaveTextContent('getBucket');
    expect(histograms[1]).toHaveTextContent('getPatient');
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
