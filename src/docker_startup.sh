#!/bin/bash
#add files to build here

cd /app/src/cpp
emcc -lembind -o file_handler.js file_handler.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 

npm run dev
