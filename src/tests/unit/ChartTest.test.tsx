import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

// Component to test
import { BoxPlotChart, BarChart } from '../../components/Charts';

describe('Test charts', () => {
    // Run this before each test
    beforeEach(() => {

      
    });
    it('Check if candleChart is rendered', async () => {
     render(<BoxPlotChart
      metrics={['getPatient', 'getBucket']}
      sites={['stockholm', 'linköping']}
     />);
     const test = screen.getByTestId('victory-chart')
    expect(test.nodeName == "VictoryChart")

    });

    it('Check if histograms are rendered', async () => {
      render(<BarChart
        metrics={['getPatient']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
      />);
     
      const histogram = screen.getByTestId('graph-header')
      expect(histogram).toHaveTextContent("getPatient")

      render(<BarChart
        metrics={['getPatient','getBucket']}
        sites={['stockholm', 'linköping', 'manchester', 'tokyo']}
      />);
      const histograms = screen.getAllByTestId('graph-header')
      expect(histograms[2]).toHaveTextContent("getBucket")
      expect(histograms[1]).toHaveTextContent("getPatient")
      

    });
    
});