#!/bin/bash
FILE_PATH="../src/cpp"

g++ -fprofile-arcs -ftest-coverage  $FILE_PATH/test_framework/test_init.cpp $FILE_PATH/tests/file_handler_test.cpp -o code_cov
./code_cov > /dev/null

if [[ $1 = "-git" ]]
then
    gcov code_cov-file_handler_test.cpp | grep -A1 src/cpp/file_handler.cpp
else
    lcov --capture --directory . --output-file=coverage.info
    genhtml coverage.info --output-directory=res
    rm coverage.info
fi

rm *.gcov
rm *.gcda
rm *.gcno
rm code_cov
