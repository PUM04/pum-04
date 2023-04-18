/**
 * @file Contains basic tests for testing the chart component.
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Component to test
import { BoxPlotChart, BarChart } from '../../components/Charts';

/**
 * Note that the tests below are very simple and an expansion of these test are needed in the future.
 * Especially with new features being integrated into the charts component.
 * Example of future tests are: color from legend component being correct, something with getting data from the back-end and looking for tickFormat and tickValues.
 */

describe('Test charts', () => {
  // Run this before each test
  beforeEach(() => {});
  it('Check if candleChart is rendered', async () => {
    render(
      <BoxPlotChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping']}
      />
    );
    const candelChart = screen.getByTestId('victory-chart');
    expect(candelChart.nodeName === 'VictoryChart');
  });

  it('Check if histograms are rendered', async () => {
    render(
      <BarChart
        metrics={['getPatient']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
      />
    );

    const histogram = screen.getByTestId('graph-header');
    expect(histogram).toHaveTextContent('getPatient');

    render(
      <BarChart
        metrics={['getPatient', 'getBucket']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
      />
    );
    const histograms = screen.getAllByTestId('graph-header');
    expect(histograms[2]).toHaveTextContent('getBucket');
    expect(histograms[1]).toHaveTextContent('getPatient');
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });*/
});
