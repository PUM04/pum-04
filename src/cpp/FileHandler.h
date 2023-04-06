#pragma once 

#include <string>
#include <vector>
#include <unordered_map>
#include <emscripten/bind.h>
#include "nlohmann/json.h"
#include <regex>

using json = nlohmann::json;

struct Site {
    json hosts;
    std::vector<json> logs;
};

struct LoadedFile {
    std::string name;
    std::string file;
};

class FileHandler {
public:
    /**
     * @brief Add a file to the FileHandler's buffer
     * 
     * @param file The content of the file
     * @param file_name  The name of the file
     */
    void add_file(std::string file, std::string file_name);

    /**
     * @brief Go through the uploaded files and link the hosts to the corresponding performance files
     * 
     */
    void compute_files();

private:
    std::unordered_map<std::string, struct Site> sites;
    std::vector<struct LoadedFile> host_files; 
    std::vector<struct LoadedFile> performance_files; 

    /**
     * @brief Get the file type, e.g. the part after the last dot
     * 
     * @param file_name The name of the file
     * @return std::string The file ending
     */
    std::string get_file_ending(std::string &file_name) const;

    /**
     * @brief Add a host file to the FileHandler
     * 
     * @param file The content of the host file
     */
    void add_host_file(std::string &file);

    /**
     * @brief Add a performance file to the FileHandler
     * 
     * @param file The content of the performance file
     * @param file_name  The file name
     */
    void add_performance_file(std::string &file, std::string &file_name);

    /**
     * @brief Get the id from the performance file
     * 
     * @param file_name The file name
     * @return std::string 
     */
    std::string get_id_from_performance(std::string &file_name) const;
    void parse_content(std::string &fileContent, std::regex &regex, std::vector<std::string> &result) const;
};

using namespace emscripten;
EMSCRIPTEN_BINDINGS(file_handler) {
    class_<FileHandler>("FileHandler")
        .constructor()
        .function("add_file", &FileHandler::add_file);
}