/**
 * @file Contains tests for the Base-component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Site } from '../../components/SiteInterface';
import FileHandlerModule from '../../cpp/file_handler';

import {
  InfoboxContainer,
  BarGraphComponent,
  BoxGraphComponent,
} from '../../components/BaseComponent';

describe('App', () => {
  // Run this before each test
  const fileHandlerPromise = FileHandlerModule().then(
    (result: any) => new result.FileHandler()
  );
  beforeEach(() => {
    const testmap = new Map<string, Site>();
    render(
      <BarGraphComponent
        metrics={['hej']}
        siteProps={testmap}
        fileHandler={undefined}
      />
    );
    render(
      <BoxGraphComponent
        metrics={['hej']}
        siteProps={testmap}
        fileHandler={undefined}
      />
    );
  });

  // Should render
  it('should render BarGraphComponent', async () => {
    await screen.findByTestId('bargraph-component');
  });

  // Should render
  it('should render BoxGraphComponent', async () => {
    await screen.findByTestId('boxgraph-component');
  });

  // Should render
  it('should render infoBoxComponent', async () => {
    const testmap = new Map<string, Site>();
    const fileHandler = await fileHandlerPromise;
    const site: Site = {
      name: 'rta',
    };

    site.color = '#000000';
    site.enabled = true;
    site.id = '4b14a8';

    const site2: Site = {
      name: 'rtx',
    };

    site2.color = '#000000';
    site2.enabled = true;
    site2.id = 'b4eb0';

    const host: String = `
    {
  "site_id": "4b14a8",
  "site_name": "rta",
  "baseline_version": "25.1",
  "type": "openstack",
  "nodes": {
    "pacscore": {
      "os": "win2019",
      "cpu": 4,
      "memory": 7.5,
      "services": [
        "sql2019",
        "wise"
      ]
    },
    "ad": {
      "os": "win2019",
      "cpu": 2,
      "memory": 4
    }}}
    `;
    const host2: String = `
    {
      "site_name": "rtx",
      "site_id": "b4eb0",
      "baseline_version": "25.1",
      "type": "azure",
      "nodes": {
        "lb": {
          "os": "ubuntu20",
          "cpu": 2,
          "memory": 8,
          "services": [
            "haproxy"
          ]
        }}}
    `;
    fileHandler.AddFile(host, 'rta.json');
    fileHandler.AddFile(host2, 'rtx.json');
    fileHandler.ComputeFiles();
    render(<InfoboxContainer siteProps={testmap} fileHandler={fileHandler} />);
    await screen.findByTestId('infobox-component');
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
