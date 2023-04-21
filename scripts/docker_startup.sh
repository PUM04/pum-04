#!/bin/bash
#add files to build here

cd /app/src/cpp
emcc -lembind -o Calculator.js Calculator.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s ENVIRONMENT="web" -s USE_ES6_IMPORT_META=0 -s SINGLE_FILE
emcc -lembind -o file_handler.js file_handler.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 -s ENVIRONMENT="web" -s USE_ES6_IMPORT_META=0 -s SINGLE_FILE

npm run dev
