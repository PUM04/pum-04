/**
 * @file Contains tests for the Menu component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Menu from '../../components/Menu';

describe('Menu', () => {
  // Run this before each test
  beforeEach(() => {
    render(<Menu fileHandler={undefined} />);
  });

  // Testcase
  it('should render open menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    expect(menuOpenButton).toBeVisible();
    //expect(menuCloseButton).toBeVisible();
  });

  it('should render close menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    await user.click(menuOpenButton);
    expect(menuCloseButton).toBeVisible();
    //expect(menuOpenButton).toBeVisible();
    await user.click(menuCloseButton);
    expect(menuOpenButton).toBeVisible();
    //expect(menuCloseButton).toBeVisible();
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
