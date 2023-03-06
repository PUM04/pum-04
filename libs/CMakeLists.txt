cmake_minimum_required(VERSION 3.10)

project(Clang-tidy-test VERSION 1.0)

# Export the compile commands for clang-tidy
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Include the header files in the build
include_directories($(PROJECT_SOURCE_DIR)/src)

# Build for automatic testing
add_executable(Test src/test.cpp src/hello_class.cpp)

# Build for deploying
add_executable(Hello src/hello.cpp src/hello_class.cpp)
