#pragma once 

#include <string>
#include <vector>
#include <unordered_map>
#include <emscripten/bind.h>
#include "nlohmann/json.h"

using json = nlohmann::json;

struct Site {
    json hosts;
    std::vector<json> logs;
};

class FileHandler {
public:
    void add_file(std::string file, std::string file_name);

private:
    std::unordered_map<std::string, struct Site> sites;

    std::string get_file_ending(std::string &file_name) const;
    void add_host_file(std::string &file);
};

using namespace emscripten;
EMSCRIPTEN_BINDINGS(file_handler) {
    class_<FileHandler>("FileHandler")
        .constructor()
        .function("add_file", &FileHandler::add_file);
}