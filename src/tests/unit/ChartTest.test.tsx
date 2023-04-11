import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

// Component to test
import { BoxPlotChart, BarChart } from '../../components/Charts';

describe('BarChart', () => {
    // Run this before each test
    beforeEach(() => {
      render(<BarChart
        metrics={['getPatient', 'getBucket']}
        sites={['tokyo', 'manchester', 'stockholm', 'linköping']}
      />);
    });
});