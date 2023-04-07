#pragma once 

#include <string>
#include <vector>
#include <unordered_map>
#include <emscripten/bind.h>
#include "nlohmann/json.h"
#include <regex>
#include <set>

using json = nlohmann::json;

struct Site {
    json hosts;
    std::set<json> logs;
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

    /**
     * @brief Get the box diagram for a given site
     *
     * @param site_id The site id 
     */
    void get_box_diagram(std::string site_id) const;

private:
    std::unordered_map<std::string, struct Site> sites;
    std::vector<struct LoadedFile> host_files; 
    std::vector<struct LoadedFile> performance_files; 

    /**
     * @brief Merge all of the log files with each other on category
     *
     * @param site The current site
     * @param key The category
     * @param box_diagram The json file for saving the result
     */
    void merge_category(struct Site &site, std::string key, json &box_diagram) const;

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

    json get_performance_json(std::string &content) const;

    void splitString(std::string &s, std::string &delim, std::vector<std::string>) const;
};

using namespace emscripten;
EMSCRIPTEN_BINDINGS(file_handler) {
    class_<FileHandler>("FileHandler")
        .constructor()
        .function("add_file", &FileHandler::add_file)
        .function("compute_files", &FileHandler::compute_files)
        .function("get_box_diagram", &FileHandler::get_box_diagram);
}
