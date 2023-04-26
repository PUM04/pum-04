/**
 * @file Contains basic tests for testing the chart component.
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import FileHandlerModule from '../../cpp/file_handler';

// Component to test
import { BoxPlotChart, BarChart } from '../../components/Charts';
import { Site } from '../../components/SiteInterface';

/**
 * Note that the tests below are very simple and an expansion of these test are needed in the future.
 * Especially with new features being integrated into the charts component.
 * Example of future tests are: color from legend component being correct, something with getting data from the back-end and looking for tickFormat and tickValues.
 */

describe('Test charts', () => {
  const fileHandlerPromise = FileHandlerModule().then(
    (result: any) => new result.FileHandler()
  );

  // Run this before each test
  beforeEach(() => {});
  // Maps each site key to a site name and a color

  it('Check if candleChart is rendered', async () => {
    const fileHandler = await fileHandlerPromise;

    const performance: string = `
response_time_bucket{method="GetPatient",le="1"} 0
response_time_bucket{method="GetPatient",le="2"} 1
response_time_bucket{method="GetPatient",le="3"} 3 
response_time_bucket{method="GetPatient",le="4"} 4
response_time_bucket{method="GetImage",le="1"} 0 
response_time_bucket{method="GetImage",le="2"} 2
response_time_bucket{method="GetImage",le="3"} 3
response_time_bucket{method="GetImage",le="4"} 0 
    `;

    // Add the host file
    fileHandler.AddFile(
      '{"site_name": "test", "site_id": "abc123"}',
      'abc123.json'
    );

    // Add the performance file
    fileHandler.AddFile(performance, 'abc123_231112.txt');

    fileHandler.ComputeFiles();

    const fakeSitePropMap = new Map<string, Site>();
    render(
      <BoxPlotChart
        siteProps={fakeSitePropMap}
        metrics={['GetPatient']}
        sites={['abc123']}
        fileHandler={fileHandler}
      />
    );
    const candelChart = screen.getByTestId('victory-chart');
    expect(candelChart.nodeName === 'VictoryChart');
  });

  it('Check if histograms are rendered', async () => {
    const fileHandler = await fileHandlerPromise;
    const fakeSitePropMap = new Map<string, Site>();

    render(
      <BarChart
        metrics={['GetPatient']}
        sites={['abc123']}
        fileHandler={fileHandler}
        siteProps={fakeSitePropMap}
      />
    );

    const histogram = screen.getByTestId('graph-header');
    expect(histogram).toHaveTextContent('GetPatient');

    render(
      <BarChart
        metrics={['GetPatient', 'GetImage']}
        sites={['abc123']}
        fileHandler={fileHandler}
        siteProps={fakeSitePropMap}
      />
    );
    const histograms = screen.getAllByTestId('graph-header');
    expect(histograms[1]).toHaveTextContent('GetPatient');
    expect(histograms[2]).toHaveTextContent('GetImage');
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
