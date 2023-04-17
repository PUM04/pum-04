#!/bin/bash

# This script will obviously only work on Linux

MAKEFILE=Makefile
OUTPUT_NAME="test_runner"

# Initialize the build environment if necessary
[[ ! -f "$MAKEFILE" ]] && cmake .

# Build the project
cmake --build .

./test_runner
