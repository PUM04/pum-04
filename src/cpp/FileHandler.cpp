#include "FileHandler.h"
#include <iostream>
#include <vector>
#include <regex>
#include "nlohmann/json.h"
#include <ctime>
#include <sstream>
#include <limits>
#include <map>

#define DEBUG

void FileHandler::add_file(std::string file, std::string file_name) {
    std::string file_ending = get_file_ending(file_name);

    if (file_ending == "txt") {
        performance_files.push_back({file_name, file});
    } else if (file_ending == "json") {
        host_files.push_back({file_name, file});
    }

    #ifdef DEBUG
    std::cout << "Added file " << file_name << "." << std::endl;
    #endif
}

void FileHandler::compute_files() {
    for (auto file : host_files) {
        add_host_file(file.file);
    }

    for (auto file : performance_files) {
        add_performance_file(file.file, file.name);
    }

    host_files = {};
    performance_files = {};

    #ifdef DEBUG
    std::cout << "Linked the host and performance files." << std::endl;
    #endif
}

std::string FileHandler::get_box_diagram(std::string site_id) const {
    // Make sure the site exists
    if (sites.find(site_id) == sites.end()) {
        #ifdef DEBUG
        std::cout << "Could not find site with id " << site_id << std::endl;
        #endif
        return "";
    }

    struct Site site = sites.at(site_id);
    json categories;
    json box_diagram;

    // Populate with the different categories
    for (json log: site.logs) {
        for (auto &el : log.items()) {
            categories[el.key()] = {};
        }
    }

    for (auto &el : categories.items()) {
        merge_category(site, el.key(), categories);
    }

    for (auto &el : categories.items()) {
        box_diagram[el.key()]["average"] = get_box_average(el.value());
        box_diagram[el.key()]["median"] = get_box_median(el.value());
        box_diagram[el.key()]["first_quartile"] = get_box_first_quartile(el.value());
        box_diagram[el.key()]["third_quartile"] = get_box_third_quartile(el.value());
        box_diagram[el.key()]["min"] = get_box_min(el.value());
        box_diagram[el.key()]["max"] = get_box_max(el.value());
    }
    return box_diagram.dump();
}

double FileHandler::get_box_average(json &category) const {
    int sum = 0;

    for (auto pair : category["data"]) {
        // Do not count the infinte length because it will skew the results
        if ((int) pair["length"] == std::numeric_limits<int>::max()) {
            continue;
        }

        sum += (int) pair["length"] * (int) pair["count"];
    }
    return sum / ((double) category["total"]);
}

int FileHandler::get_box_limit(json &category, double limit) const {
    const int total = (int) category["total"];
    int sum = 0;

    for (auto pair : category["data"]) {
        sum += (int) pair["count"];

        if (sum >= total * limit) {
            return (int) pair["length"];
        }
    }
    return 0;
}

int FileHandler::get_box_median(json &category) const {
    return get_box_limit(category, 0.5);
}

int FileHandler::get_box_first_quartile(json &category) const {
    return get_box_limit(category, 0.25);
}

int FileHandler::get_box_third_quartile(json &category) const {
    return get_box_limit(category, 0.75);
}

int FileHandler::get_box_min(json &category) const {
    for (auto pair : category["data"]) {
        if (pair["count"] != 0) {
            return (int) pair["length"];
        }
    }
    return 0;
}

int FileHandler::get_box_max(json &category) const {
    auto data = category["data"];
    
    // Loop through the data backwards
    for (auto it = data.rbegin(); it != data.rend(); it++) {
        if ((*it)["count"] != 0) {
            return (int) (*it)["length"];
        }
    }
    return 0;
}

void FileHandler::merge_category(struct Site &site, std::string key, json &result) const {
    result[key] = {};
    result[key]["total"] = 0;

    std::map<int, int> length_count;

    for (json log : site.logs) {
        json category = log[key];


        auto count_it = category["count"].begin();
        const auto count_end = category["count"].end();

        auto length_it = category["length"].begin();
        const auto length_end = category["length"].end();

        int last_count = 0;
        // Maybe parse the sum instead of recalculating it here?
        int sum = 0;

        // Hopefully unnecessary since they should be of the same length
        // Calculate the real count from the aggregation
        // Align the length to the count in pairs
        while(count_it != count_end && length_it != length_end) {
            int new_count = (int) *count_it - last_count;

            // Illegal nesting
            if (length_count.find(*length_it) == length_count.end()) {
                length_count[*length_it] = new_count;
            } else {
                length_count[*length_it] += new_count;
            }

            last_count = (int) *count_it;
            sum += new_count;
            
            count_it++;
            length_it++;
        }
        result[key]["total"] = (int) result[key]["total"] + sum;
    }

    // Add the data to the json object
    for (auto const & entry : length_count) {
        result[key]["data"] += {
            {"length", entry.first},
            {"count", entry.second}
        };
    }
}

std::string FileHandler::get_file_ending(std::string &file_name) const {
    return file_name.substr(file_name.find(".") + 1);
}

void FileHandler::add_host_file(std::string &file) {
    json hosts = json::parse(file);
    std::string site_id = hosts["site_id"];

    // Add the site if it does not already exist
    if (sites.find(site_id) == sites.end()) {
        sites[site_id] = {hosts, {}};

        #ifdef DEBUG
        std::cout << "Added site with id " << site_id << "." << std::endl;
        #endif
    } else {
        #ifdef DEBUG
        std::cout << "Site with id " << site_id << " already exist." << std::endl;
        #endif
    }
}

json FileHandler::get_performance_json(std::string &content) const {
    std::vector<std::string> methods;
    std::vector<std::string> buckets;

    std::istringstream content_stream(content);
    std::string line;

    json performance;

    while(std::getline(content_stream, line)) {
        if (line.find(",le=") == std::string::npos) {
            continue;
        }

        size_t start = line.find("\"");
        size_t end = line.find("\"", start + 1);
        std::string method = line.substr(start + 1, end - start - 1);

        start = line.find("\"", end + 1);
        end = line.find("\"", start + 1);
        std::string length = line.substr(start + 1, end - start - 1);

        start = line.find(" ");
        std::string count = line.substr(start);

        if (length == "+Inf") {
            performance[method]["length"] += std::numeric_limits<int>::max();
        } else {
            performance[method]["length"] += std::stoi(length);
        }       

        performance[method]["count"] += std::stoi(count);
    }

    return performance;
}

void FileHandler::add_performance_file(std::string &file, std::string &file_name) {
    std::string site_id = get_id_from_performance(file_name);

    // Add the host to the corresponding site if it exists
    if (sites.find(site_id) != sites.end()) {
        json performance = get_performance_json(file);
        sites[site_id].logs.insert(performance);

        #ifdef DEBUG
        std::cout << "Linked log " << file_name << " to " << site_id << "." << std::endl;
        #endif

    } else {
        #ifdef DEBUG
        std::cout << "The site with id " << site_id << " does not exist." << std::endl;
        #endif
    }
}

std::string FileHandler::get_id_from_performance(std::string &file_name) const {
    return  file_name.substr(0, file_name.find("_"));
}