/**
 * @file Contains tests for the Menu component
 */
import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Menu, { addFilesToBackend } from '../../components/Menu';
import { Site } from '../../components/SiteInterface';

describe('Menu', () => {
  // Run this before each test
  beforeEach(() => {
    const testmap = new Map<string, Site>();
    const useStateMock = jest.fn();
    const MockFileHandler = jest.fn().mockImplementation(() => ({
      ComputeFiles: jest.fn(),
      GetSites: jest
        .fn()
        .mockReturnValue(
          '{"sites": ["test_site1", "test_site2", "test_site3"]}'
        ),
      GetMetrics: jest
        .fn()
        .mockReturnValue('{"metrics": ["metric1", "metric2", "metric3"]}'),
    }));

    render(
      <Menu
        fileHandler={new MockFileHandler()}
        setSiteProps={useStateMock}
        siteProps={testmap}
        setMetricProps={useStateMock}
      />
    );
  });

  // Testcase
  it('should render open menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    expect(menuOpenButton).toBeVisible();
  });

  it('should render close menu button', async () => {
    const menuOpenButton = await screen.findByTestId('menu-open-button');
    // const menuCloseButton = await screen.findByTestId('menu-close-button');
    await user.click(menuOpenButton);
    const menuCloseButton = await screen.findByTestId('menu-close-button');
    expect(menuCloseButton).toBeVisible();
    await user.click(menuCloseButton);
    expect(menuOpenButton).toBeVisible();
  });
  // Run this after each test
  afterEach(() => {
    cleanup();
  });
});

describe('addFilesToBackend', () => {
  const MockFileHandler = jest.fn().mockImplementation(() => ({
    AddFile: jest.fn(),
  }));
  const mockedFileHandler = new MockFileHandler();

  const fileReaderMock = jest
    .spyOn(global, 'FileReader')
    .mockImplementation(
      () => ({ readAsText: jest.fn(), result: 'mock data' } as any)
    );

  it("should call fileHandler's AddFiles", async () => {
    const testFiles = [
      new File(['Test data1'], 'testFile1.txt'),
      new File(['Test data2'], 'testFile2.txt'),
    ];
    addFilesToBackend(testFiles, mockedFileHandler);

    expect(FileReader).toBeCalledTimes(testFiles.length);

    // make sure files are read
    fileReaderMock.mock.results.forEach((result, i) => {
      expect(result.value.readAsText).toHaveBeenCalledTimes(1);
      expect(result.value.readAsText).toBeCalledWith(testFiles[i]);
      // eslint-disable-next-line max-nested-callbacks
      act(() => result.value.onload());
    });

    // make sure data is sent to backend
    expect(mockedFileHandler.AddFile).toHaveBeenCalledTimes(testFiles.length);
    expect(mockedFileHandler.AddFile).toHaveBeenNthCalledWith(
      1,
      'mock data',
      'testFile1.txt'
    );
    expect(mockedFileHandler.AddFile).toHaveBeenNthCalledWith(
      2,
      'mock data',
      'testFile2.txt'
    );
  });
});
