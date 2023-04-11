/**
 * @file Contains tests for the Menu component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Menu from '../../components/Menu';
import DragAndDropzone from '../../components/DragAndDropzone';

describe('Menu', () => {
  // Run this before each test
  beforeEach(() => {
    render(<Menu />);
  });

  // Testcase
  it('should render open menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    expect(menuOpenButton).toBeVisible();
    expect(menuCloseButton).not.toBeVisible();
  });

  it('should render close menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    await user.click(menuOpenButton);
    expect(menuCloseButton).toBeVisible();
    expect(menuOpenButton).not.toBeVisible();
    await user.click(menuCloseButton);
    expect(menuOpenButton).toBeVisible();
    expect(menuCloseButton).not.toBeVisible();
  });

  it('should be able to upload', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    await user.click(menuOpenButton);
    const setFilesMock = jest.fn();
    const startFile = new File([], 'testFile.txt');
    const files: File[] = [startFile];
    render(<DragAndDropzone setter={setFilesMock} value={files} />);
    const dropInput = await screen.findAllByTestId('drop-input');
    expect(setFilesMock).toHaveBeenCalledTimes(0);

    const testFile1 = new File([], '');
    await user.upload(dropInput[0], testFile1);
    expect(setFilesMock).toHaveBeenCalledTimes(0);
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});
