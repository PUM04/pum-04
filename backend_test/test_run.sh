#!/bin/bash

# This script will obviously only work on Linux

MAKEFILE=Makefile
OUTPUT_NAME="test_runner"

# Initialize the build environment if necessary
#[[ ! -f "$MAKEFILE" ]] && emcmake cmake .
[[ ! -f "$MAKEFILE" ]] && cmake .

# Build the project
#emmake cmake --build .
cmake --build .

# Change the file type to cjs for node to run it correctly
#mv "$OUTPUT_NAME.js" "$OUTPUT_NAME.cjs"

#node "$OUTPUT_NAME.cjs"
./test_runner
