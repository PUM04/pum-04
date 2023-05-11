#pragma once 

#include <string>
#include <vector>
#include <unordered_map>
#include "nlohmann/json.h"
#include <regex>
#include <set>
#include <list>

#ifndef _TESTING_
#include <emscripten/bind.h>
#endif

using json = nlohmann::json;

struct Site {
    json hosts;
    std::set<json> logs;
    json info_box = NULL;
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
    void AddFile(std::string file, std::string file_name);

    /**
     * @brief Go through the uploaded files and link the hosts to the corresponding performance files
     * 
     */
    void ComputeFiles();

    /**
     * @brief Get the info box for a site
     *
     * @return std::string The info box as a JSON object
     */
    std::string GetInfoBox(std::string site_id);

    /**
     * @brief Get the box diagram for a given site
     *
     * @param site_id The site id 
     */
    std::string GetBoxDiagram(std::string site_id) const;

    /**
     * @brief Get the histogram for a given site
     *
     * @param site_id The site id
     */
    std::string GetHistogram(std::string site_id) const;

    /**
     * @brief Get the names and ids of all the sites
     *
     * @return std::vector<std::string> The names of the sites
     */
    std::string GetSites() const;

    /**
     * @brief Get the metrics for all sites.
     *
     * @return std::string The metrics
     */
    std::string GetMetrics() const;

  private:
    std::unordered_map<std::string, struct Site> sites;
    std::vector<struct LoadedFile> host_files; 
    std::list<struct LoadedFile> performance_files; 
    
    void CalculateCategories(struct Site &site, json &categories, bool keepInf) const;

    /**
     * @brief Merge all of the log files with each other on category
     *
     * @param site The current site
     * @param key The category
     * @param box_diagram The json file for saving the result
     */
    void MergeCategory(struct Site &site, std::string key, json &result, bool keepInf) const;

    /**
     * @brief Get the average value from a category
     * 
     * @param category The category data
     * @return double The average
     */
    double GetBoxAverage(json &category) const;

    /**
     * @brief Get the median value from a category
     * 
     * @param category The category data
     * @return int The median
     */
    int GetBoxMedian(json &category) const;

    /**
     * @brief Get the first quartile from a category
     * 
     * @param category The category data
     * @return int The first quartile
     */
    int GetBoxFirstQuartile(json &category) const;

    /**
     * @brief Get the third quartile from a category
     * 
     * @param category The category data
     * @return int The third quartile
     */
    int GetBoxThirdQuartile(json &category) const;

    /**
     * @brief Get the divider of limit% of the data. For example: Limit 0.5 will yield the median, 
     * 0.25 the first quartile
     * 
     * @param json The category data
     * @param limit The limit
     * @return int The divider value
     */
    int GetBoxLimit(json &json, double limit) const;

    /**
     * @brief Get the min value from a category
     * 
     * @param category The category data
     * @return int The min value
     */
    int GetBoxMin(json &category) const;

    /**
     * @brief Get the max value from a category
     * 
     * @param category The category data
     * @return int The max value
     */
    int GetBoxMax(json &category) const;

    /**
     * @brief Get the file type, e.g. the part after the last dot
     * 
     * @param file_name The name of the file
     * @return std::string The file ending
     */
    std::string GetFileEnding(std::string &file_name) const;

    /**
     * @brief Add a host file to the FileHandler
     * 
     * @param file The content of the host file
     */
    void AddHostFile(std::string &file);

    /**
     * @brief Add a performance file to the FileHandler
     * 
     * @param file The content of the performance file
     * @param file_name  The file name
     * @return bool If the file was added
     */
    bool AddPerformanceFile(std::string &file, std::string &file_name);

    /**
     * @brief Get the id from the performance file
     * 
     * @param file_name The file name
     * @return std::string 
     */
    std::string GetIdFromPerformance(std::string &file_name) const;

    void ParseContent(std::string &fileContent, std::regex &regex, std::vector<std::string> &result) const;

    json GetPerformanceJson(std::string &content) const;

    void SplitString(std::string &s, std::string &delim,
                     std::vector<std::string>) const;

    /**
     * @brief Check if a site is valid for calculations
     *
     * @param site_id The site id
     * @return bool If it is valid or not
     */
    bool isSiteValid(std::string site_id) const;
};

#ifndef _TESTING_
using namespace emscripten;
EMSCRIPTEN_BINDINGS(file_handler) {
    class_<FileHandler>("FileHandler")
        .constructor()
        .function("AddFile", &FileHandler::AddFile)
        .function("ComputeFiles", &FileHandler::ComputeFiles)
        .function("GetBoxDiagram", &FileHandler::GetBoxDiagram)
        .function("GetSites", &FileHandler::GetSites)
        .function("GetHistogram", &FileHandler::GetHistogram)
        .function("GetMetrics", &FileHandler::GetMetrics)
        .function("GetInfoBox", &FileHandler::GetInfoBox);
}
#endif
