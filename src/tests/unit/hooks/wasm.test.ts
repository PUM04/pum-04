/**
 * @file Contains tests for the WebAssembly hooks
 */

// Component to test
import { renderHook, cleanup, waitFor } from '@testing-library/react';
import {
  EmscriptenInstantiatedModule,
  useWasm,
  useWasmFile,
} from '../../../hooks/wasm';

describe('useWasm', () => {
  it('should call module factory function', async () => {
    const MockedWasmModule = jest.fn<EmscriptenInstantiatedModule, []>();
    const expectedReturnValue = new MockedWasmModule();

    const moduleFactoryMock = jest.fn<EmscriptenInstantiatedModule, []>(
      (): EmscriptenInstantiatedModule => expectedReturnValue
    );

    renderHook((wasmModule: any) => useWasm(wasmModule), {
      initialProps: moduleFactoryMock,
    });

    await waitFor(() => expect(moduleFactoryMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(moduleFactoryMock).toHaveReturnedWith(expectedReturnValue)
    );
  });

  it('should not instantiate wasm module on rerender', async () => {
    const MockedWasmModule = jest.fn<EmscriptenInstantiatedModule, []>();
    const expectedReturnValue = new MockedWasmModule();

    const moduleFactoryMock = jest.fn<EmscriptenInstantiatedModule, []>(
      (): EmscriptenInstantiatedModule => expectedReturnValue
    );

    const { rerender } = renderHook((wasmModule: any) => useWasm(wasmModule), {
      initialProps: moduleFactoryMock,
    });
    await waitFor(() => expect(moduleFactoryMock).toHaveBeenCalledTimes(1));

    rerender(moduleFactoryMock);
    await waitFor(() => expect(moduleFactoryMock).toHaveBeenCalledTimes(1));
  });

  it('should instantiate wasm module if module factory function is updated', async () => {
    const MockedWasmModule = jest.fn<EmscriptenInstantiatedModule, []>();
    const expectedReturnValue = new MockedWasmModule();

    const moduleFactoryMock = jest.fn<EmscriptenInstantiatedModule, []>(
      (): EmscriptenInstantiatedModule => expectedReturnValue
    );

    const { rerender } = renderHook((wasmModule: any) => useWasm(wasmModule), {
      initialProps: moduleFactoryMock,
    });
    await waitFor(() => expect(moduleFactoryMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(moduleFactoryMock).toHaveReturnedWith(expectedReturnValue)
    );

    const newExpectedReturnValue = new MockedWasmModule();

    const newModuleFactoryMock = jest.fn<EmscriptenInstantiatedModule, []>(
      (): EmscriptenInstantiatedModule => newExpectedReturnValue
    );
    rerender(newModuleFactoryMock);
    await waitFor(() => expect(newModuleFactoryMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(moduleFactoryMock).toHaveReturnedWith(newExpectedReturnValue)
    );
    // old module should not have been called again
    await waitFor(() => expect(moduleFactoryMock).toHaveBeenCalledTimes(1));
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
});

describe('useWasmFile', () => {
  global.fetch = jest.fn(() => Promise.resolve({ body: 'data' })) as jest.Mock;

  it('should instantiate wasm module and return exports', async () => {
    const mockedWasmInstance = {
      instance: { exports: { testFunc: () => {} } },
      module: {},
    };

    global.WebAssembly.instantiateStreaming = jest.fn(
      (): Promise<WebAssembly.WebAssemblyInstantiatedSource> =>
        Promise.resolve(mockedWasmInstance)
    ) as jest.Mock;

    const { result } = renderHook(() => useWasmFile('test/path.wasm'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(global.WebAssembly.instantiateStreaming).toHaveBeenCalledTimes(1)
    );
    expect(result.current).toBe(mockedWasmInstance.instance.exports);
  });

  // Run this after each test
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
});
