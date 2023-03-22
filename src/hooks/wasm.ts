/**
 * @file Contains hooks for loading and instantianting WebAssembly modules.
 */
import { useState, useEffect } from 'react';

export interface EmscriptenInstantiatedModule extends EmscriptenModule {
  [x: string | number | symbol]: any;
}

/**
 * This hook instantiates and returns an Emscripten WASM module.
 * If the module is instantiated, it is returned.
 *
 * @param createModule function which creates a new Emscripten WASM module
 * @returns an instantiated Emscripten module
 */
export const useWasm = (
  createModule: EmscriptenModuleFactory<EmscriptenInstantiatedModule>
): EmscriptenInstantiatedModule => {
  const [wasmModule, setWasmModule] = useState<EmscriptenInstantiatedModule>();
  useEffect(() => {
    const loadWasm = async () => {
      const wasm = await createModule();
      setWasmModule(wasm);
    };
    loadWasm();
  }, [createModule]);
  return wasmModule as EmscriptenInstantiatedModule;
};

/**
 * This hook compiles and instantiates a .wasm binary and returns its exports.
 * If already instantiated, it is returned.
 *
 * @param {string} file path to .wasm file
 * @returns {EmscriptenInstantiatedModule} exported function definitions
 */
export const useWasmFile = (file: string): Record<string, CallableFunction> => {
  const [wasmModule, setWasmModule] = useState<WebAssembly.Exports>();
  useEffect(() => {
    const loadWasm = async () => {
      const wasmContent = await fetch(file);
      const wasm = await WebAssembly.instantiateStreaming(wasmContent);

      if (wasm === undefined) throw Error('Could not load WASM.');
      setWasmModule(wasm.instance.exports);
    };
    loadWasm();
  }, [file]);
  return wasmModule as Record<string, CallableFunction>;
};
