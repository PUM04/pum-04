/**
 * @file Contains tests for the Menu component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Menu from '../../components/Menu';

const sites = [
  { name: 'first', color: 'red', enabled: true },
  { name: 'second', color: 'blue', enabled: true },
  { name: 'third', color: 'orange', enabled: true },
];

describe('Menu', () => {
  // Run this before each test
  beforeEach(() => {
    render(<Menu sites={sites} />);
  });

  // Testcase
  it('should render open menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    // const menuCloseButton = await screen.findByTestId('menu-close-button');
    expect(menuOpenButton).toBeVisible();
    // expect(menuCloseButton).toBeVisible();
  });

  it('should render close menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    // const menuCloseButton = await screen.findByTestId('menu-close-button');
    await user.click(menuOpenButton);
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    expect(menuCloseButton).toBeVisible();
    // expect(menuOpenButton).toBeVisible();
    await user.click(menuCloseButton);
    expect(menuOpenButton).toBeVisible();
    // expect(menuCloseButton).toBeVisible();
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
