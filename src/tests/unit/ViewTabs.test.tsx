/**
 * @file Contains tests for the ViewTabcomponent
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import ViewTabs from '../../components/ViewTabs';

describe('ViewTabs', () => {
  // Run this before each test
  beforeEach(() => {
    render(<ViewTabs fileHandler={undefined} />);
  });

  it('Should render both buttons', async () => {
    const barTab = await screen.findByTestId('bar-tab');
    const boxTab = await screen.findByTestId('box-tab');
    expect(barTab).toBeVisible();
    expect(boxTab).toBeVisible();
  });

  it('Should render the tab panel for the selected button', async () => {
    const barTab = await screen.findByTestId('bar-tab');
    await user.click(barTab);
    const barTabPanel = await screen.findByTestId('tab-panel-0');
    expect(barTabPanel).toBeVisible();

    const boxTab = await screen.findByTestId('box-tab');
    await user.click(boxTab);
    const boxTabPanel = await screen.findByTestId('tab-panel-1');
    expect(boxTabPanel).toBeVisible();
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
