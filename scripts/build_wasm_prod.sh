#!/bin/bash

cd src/cpp

emcc -lembind -o file_handler.js file_handler.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s NO_DISABLE_EXCEPTION_CATCHING -s ALLOW_MEMORY_GROWTH -O3
