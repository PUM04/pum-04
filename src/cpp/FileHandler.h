#pragma once 

#include <string>
#include <vector>
#include <map>
#include <emscripten/bind.h>

struct File {
    std::string name;
    std::vector<struct Metric> metrics;
};

struct PerformanceName {
    std::string name;
    int sum;
    int count;
    std::vector<struct Bucket> buckets;
};

struct Metric : PerformanceName {};

struct Method : PerformanceName {};

struct Bucket {
    int length;
    int count;
};

class FileHandler {
public:
    void add_file(std::string file);

private:
    std::vector<struct File> files;
};

using namespace emscripten;
EMSCRIPTEN_BINDINGS(file_handler) {
    class_<FileHandler>("FileHandler")
        .constructor()
        .function("add_file", &FileHandler::add_file);
}