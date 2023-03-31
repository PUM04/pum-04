/**
 * @file Contains basic test examples for testing with React.
 */
// Testing utilities
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

// Component to test
import App from '../App';

describe('App', () => {
  // Run this before each test
  beforeEach(() => {
    render(<App />);
  });

  // Testcase
  it('should render button count', async () => {
    const buttonCount = await screen.findByRole('button');
    expect(buttonCount.innerHTML).toBe('count is 0');
  });

  // Another testcase
  it('should update count on click', async () => {
    const buttonCount = await screen.findByRole('button');
    expect(buttonCount.innerHTML).toBe('count is 0');

    await user.click(buttonCount);
    expect(buttonCount.innerHTML).toBe('count is 1');

    await user.click(buttonCount);
    expect(buttonCount.innerHTML).toBe('count is 2');
  });

  // Another testcase
  it('count should roll over from 10 to 0', async () => {
    const buttonCount = await screen.findByRole('button');
    expect(buttonCount.innerHTML).toBe('count is 0');

    const clickActions = [];
    for (let i = 0; i < 10; i++) {
      clickActions.push(user.click(buttonCount));
    }

    await Promise.all(clickActions);
    expect(buttonCount.innerHTML).toBe('count is 10');

    await user.click(buttonCount);
    expect(buttonCount.innerHTML).toBe('count is 0');
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
