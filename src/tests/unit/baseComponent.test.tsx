import React from 'react';
import { cleanup, render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';

import { InfoboxComponent, GraphComponent} from '../../components/BaseComponent';

describe('App', () => {
    // Run this before each test
    beforeEach(() => {
        render(<GraphComponent />);
        render(<InfoboxComponent />);
    });
  
    // Tshould render 
    it('should render graphComponent', async () => {
      const graphBox = await screen.findByTestId('graph-component');
    });
  
    // Tshould render 
    it('should render graphComponent', async () => {
        const infoBox = await screen.findByTestId('infobox-component');
    });

    // Run this after each test
    afterEach(() => {
      cleanup();
    });
});


