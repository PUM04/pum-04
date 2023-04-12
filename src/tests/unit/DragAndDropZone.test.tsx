/**
 * @file Contains tests for the DragAndDropZone component
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import DragAndDropzone from '../../components/DragAndDropzone';

describe('DragAndDropzone', () => {
  beforeEach(() => {});

  it('should render without any files set', async () => {
    const setFilesMock = jest.fn();
    const files: File[] = [];

    render(<DragAndDropzone setter={setFilesMock} value={files} />);

    const dropBox = await screen.findByTestId('drop-box');
    expect(dropBox.textContent).toBe('Upload files');
  });

  it('should render with a file pre-set', async () => {
    const setFilesMock = jest.fn();
    const files: File[] = [new File([], 'testFile.txt')];

    render(<DragAndDropzone setter={setFilesMock} value={files} />);

    const dropBox = await screen.findByTestId('drop-box');
    expect(dropBox.textContent).toBe('Upload files');
  });

  it('should call setter on upload', async () => {
    const setFilesMock = jest.fn();
    const startFile = new File([], 'testFile.txt');
    const files: File[] = [startFile];

    render(<DragAndDropzone setter={setFilesMock} value={files} />);
    const dropInput = await screen.findByTestId('drop-input');

    expect(setFilesMock).toHaveBeenCalledTimes(0);

    const testFile1 = new File([], 'testFile1.txt');
    await user.upload(dropInput, testFile1);
    expect(setFilesMock).toHaveBeenCalledTimes(1);
    expect(setFilesMock).toBeCalledWith([startFile, testFile1]);

    const testFile2 = new File([], 'testFile2.txt');
    await user.upload(dropInput, [testFile1, testFile2]);
    expect(setFilesMock).toHaveBeenCalledTimes(2);
    expect(setFilesMock).toBeCalledWith([startFile, testFile1, testFile2]);
  });

  afterEach(() => {
    cleanup();
  });
});
