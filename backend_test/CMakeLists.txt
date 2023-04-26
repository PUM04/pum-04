cmake_minimum_required(VERSION 3.10)
project(SANDAHL VERSION 1.0)

# Define C++ std
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Export the compile commands for clang-tidy
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_definitions(${CMAKE_FLAGS})

add_compile_options(-fprofile-arcs -ftest-coverage)
add_link_options(-lgcov --coverage)

file(GLOB_RECURSE test_src CONFIGURE_DEPENDS 
    "../src/cpp/*.h" 
    "../src/cpp/tests/*.h" 
    "../src/cpp/tests/*.cpp", 
    "../src/cpp/test_framework/*.h"
    "../src/cpp/test_framework/*.cpp"
)

# Build for automatic testing
add_executable(test_runner ${test_src})
