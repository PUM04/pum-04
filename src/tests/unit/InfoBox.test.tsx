/**
 * @file Contains tests for the InfoBoxcomponent
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBox from '../../components/InfoBox';
import FileHandlerModule from '../../cpp/file_handler';

describe('InfoBox', () => {
  const fileHandlerPromise = FileHandlerModule().then(
    (result: any) => new result.FileHandler()
  );

  // Run this before each test
  beforeEach(() => {});

  // Testcase 1
  it('should render the info box', async () => {
    const fileHandler = await fileHandlerPromise;

    const host: string = `
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

    fileHandler.AddFile(host, 'rta.json');
    fileHandler.ComputeFiles();

    render(<InfoBox siteId="4b14a8" fileHandler={fileHandler} />);

    const infoBox = await screen.findByTestId('info-box');
    expect(infoBox).toBeVisible();
  });

  // Testcase 2
  it('should render the info box', async () => {
    const fileHandler = await fileHandlerPromise;

    render(<InfoBox siteId="4b14a8" fileHandler={fileHandler} />);

    const infoBox = await screen.findByTestId('info-box');
    expect(infoBox).toBeVisible();
  });

  // Testcase 3
  it('should render the info box', async () => {
    render(<InfoBox siteId="4b14a8" fileHandler={undefined} />);

    const infoBox = await screen.findByTestId('info-box');
    expect(infoBox).toBeVisible();
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
