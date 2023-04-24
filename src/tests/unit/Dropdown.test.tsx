/**
 * @file Contains tests for the Dropdown component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Dropdown from '../../components/Dropdown';
import '@testing-library/jest-dom/extend-expect';

describe('Dropdown', () => {
  // Run this before each test
  beforeEach(() => {
    render(
      <Dropdown
        dropdownName="test"
        value={['test1', 'test2', 'test3']}
        onSelected={() => {}}
      />
    );
  });

  // Testcase
  it('should render Dropdown', async () => {
    const dropdownButton = await screen.findByTestId('dropdown-button');
    const dropdownCheckBox = await screen.findByTestId('dropdown-checkbox');
    expect(dropdownButton).toBeVisible();
    expect(dropdownCheckBox).toBeVisible();
  });

  it('should render list items from dropdown', async () => {
    const dropdownButton = await screen.findByTestId('dropdown-button');
    const dropdownCheckBox = await screen.findByTestId('dropdown-checkbox');

    await user.click(dropdownButton);
    const listCheckBox = await screen.findAllByTestId('list-checkbox');
    expect(dropdownButton).toBeVisible();
    expect(dropdownCheckBox).toBeVisible();
    expect(listCheckBox[0]).toBeVisible();
    expect(listCheckBox[1]).toBeVisible();
    expect(listCheckBox[2]).toBeVisible();
  });

  it('checkboxes should be checked to begin with', async () => {
    const dropdownButton = await screen.findByTestId('dropdown-button');
    const dropdownCheckBox = (
      await screen.findByTestId('dropdown-checkbox')
    ).querySelector('input[type="checkbox"]');
    await user.click(dropdownButton);
    const listCheckBox = await screen.findAllByTestId('list-checkbox');
    const test1 = listCheckBox[0].querySelector('input[type="checkbox"]');
    const test2 = listCheckBox[1].querySelector('input[type="checkbox"]');
    const test3 = listCheckBox[2].querySelector('input[type="checkbox"]');
    expect(dropdownCheckBox).toHaveProperty('checked', false);
    expect(test1).toHaveProperty('checked', false);
    expect(test2).toHaveProperty('checked', false);
    expect(test3).toHaveProperty('checked', false);
  });

  it('checkboxes should have standard logik', async () => {
    const dropdownButton = await screen.findByTestId('dropdown-button');

    await user.click(dropdownButton);
    const listCheckBox = screen.getAllByRole('checkbox');
    await user.click(listCheckBox[0]);
    expect(listCheckBox[0]).toHaveProperty('checked', true);
    expect(listCheckBox[1]).toHaveProperty('checked', true);
    expect(listCheckBox[2]).toHaveProperty('checked', true);
    expect(listCheckBox[3]).toHaveProperty('checked', true);
    await user.click(listCheckBox[0]);
    expect(listCheckBox[0]).toHaveProperty('checked', false);
    expect(listCheckBox[1]).toHaveProperty('checked', false);
    expect(listCheckBox[2]).toHaveProperty('checked', false);
    expect(listCheckBox[3]).toHaveProperty('checked', false);
    await user.click(listCheckBox[1]);
    expect(listCheckBox[0]).toHaveProperty('checked', false);
    expect(listCheckBox[1]).toHaveProperty('checked', true);
    expect(listCheckBox[2]).toHaveProperty('checked', false);
    expect(listCheckBox[3]).toHaveProperty('checked', false);
    await user.click(listCheckBox[1]);
    expect(listCheckBox[0]).toHaveProperty('checked', false);
    expect(listCheckBox[1]).toHaveProperty('checked', false);
    expect(listCheckBox[2]).toHaveProperty('checked', false);
    expect(listCheckBox[3]).toHaveProperty('checked', false);
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
