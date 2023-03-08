#!/bin/bash
#add files to build here

cd /app/src/cpp
emcc -lembind -o Calculator.js Calculator.cpp -s EXPORT_ES6=1 -s MODULARIZE=1 

npm run dev


