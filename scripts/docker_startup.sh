#!/bin/bash
#add files to build here

source /emsdk/emsdk_env.sh

cd /app/src/cpp
emcc -lembind -o Calculator.js Calculator.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s NO_DISABLE_EXCEPTION_CATCHING
emcc -lembind -o file_handler.js file_handler.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s NO_DISABLE_EXCEPTION_CATCHING -s ALLOW_MEMORY_GROWTH

npm run dev
