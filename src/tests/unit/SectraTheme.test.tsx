/**
 * @file Contains tests for the SectraTheme component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SectraTheme from '../../components/SectraTheme';

describe('SectraTheme', () => {
  it('should render children', () => {
    render(
      <SectraTheme>
        <div data-testid="test-div">
          <p>test</p>
        </div>
      </SectraTheme>
    );

    const testDiv = screen.getByTestId('test-div');
    expect(testDiv).toBeInTheDocument();
    expect(testDiv.textContent).toBe('test');
  });

  it('should use css variables when mui class found', () => {
    // mock the css variables
    global.document.querySelector = jest.fn().mockReturnValue({});
    global.getComputedStyle = jest
      .fn()
      .mockReturnValue(new CSSStyleDeclaration());
    global.CSSStyleDeclaration.prototype.getPropertyValue = jest
      .fn()
      .mockReturnValue('#FF7B30');

    render(
      <div className=".mui-theme">
        <SectraTheme>
          <div data-testid="test-div">
            <p>test</p>
          </div>
        </SectraTheme>
      </div>
    );
    // verify that we are getting the css variables
    expect(global.getComputedStyle).toHaveBeenCalledTimes(1);
    expect(
      global.CSSStyleDeclaration.prototype.getPropertyValue
    ).toHaveBeenCalledTimes(7);
    // verify that the children are rendered
    const testDiv = screen.getByTestId('test-div');
    expect(testDiv.textContent).toBe('test');
  });

  afterEach(() => {
    cleanup();
  });
});
