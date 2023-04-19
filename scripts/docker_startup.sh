#!/bin/bash
#add files to build here

cd /app/src/cpp
emcc -lembind -o file_handler.js file_handler.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s NO_DISABLE_EXCEPTION_CATCHING

npm run dev
