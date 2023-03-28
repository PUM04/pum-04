cmake_minimum_required(VERSION 3.10)

# Define C++ std
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(Clang-tidy-test VERSION 1.0)

# Export the compile commands for clang-tidy
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Include the header files in the build
include_directories($(PROJECT_SOURCE_DIR)/src)

file(GLOB_RECURSE test_src CONFIGURE_DEPENDS "src/*.h" "src/*.cpp" "test/*.h" "test/*.cpp")

# Build for automatic testing
add_executable(Test ${test_src})
