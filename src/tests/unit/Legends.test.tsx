import React from 'react';
import { cleanup, render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';

import Legends from '../../components/Legends';

describe('App', () => {
    // Run this before each test
    beforeEach(() => {
        const sites = [
            {name: 'first', color: 'red', enabled: true},
            {name: 'second', color: 'blue', enabled: true},
            {name: 'third', color: 'orange', enabled: true},
          ];
        render(<Legends sites={sites}/>);

    });
  
    // Tshould render 
    it('should render legends', async () => {
      const legends = await screen.findByTestId('legends-component');
        
    });

    it('should render legend', async () => {
        const legend = await screen.findAllByTestId('legend-component');
    });

  
    // // Tshould render 
    // it('should render graphComponent', async () => {
    //     const infoBox = await screen.findByTestId('infobox-component');
    // });

    // Run this after each test
    afterEach(() => {
      cleanup();
    });
});


