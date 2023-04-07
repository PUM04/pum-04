#include "FileHandler.h"
#include <iostream>
#include <vector>
#include <regex>
#include "nlohmann/json.h"
#include <ctime>
#include <sstream>
#include <limits>

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
    /*
    Get metric/method name (?<={(metric|method)=")\w*(?=",le="(\d*|\+Inf)"} \d*\n)
    Get length (?<={(metric|method)="\w*",le=")(\d*|\+Inf)(?=")
    Get count for both metrics and methods: (?<={(metric|method)="\w*",le="(\d*|\+Inf)"} )\d*\n
    
    NEW IMPROVED: "(?<={(metric|method)=\")[_[:alnum:]]*(?=\",le=\"([[:digit:]]*|+Inf)\"} [[:digit:]]*\n)"

     name: [A-z]+(?=\",le=)
      ([0-9]+|+Inf)(?=\"})
    
    */
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

void FileHandler::get_box_diagram(std::string site_id) const {
    // Make sure the site exists
    if (sites.find(site_id) == sites.end()) {
        #ifdef DEBUG
        std::cout << "Could not find site with id " << site_id << std::endl;
        #endif
        return;
    }

    struct Site site = sites.at(site_id);
    json box_diagram = {};

    // Populate with the different categories
    for (json log: site.logs) {
        for (auto &el : log.items()) {
            box_diagram[el.key()] = {};
        }
    }

    for (auto &el : box_diagram.items()) {
        merge_category(site, el.key(), box_diagram);
    }
}

void FileHandler::merge_category(struct Site &site, std::string key, json &box_diagram) const {
    for (json log : site.logs) {
        json category = log[key];

        box_diagram[key] = {};

        auto count_it = category["count"].begin();
        auto count_end = category["count"].end();

        auto length_it = category["length"].begin();
        auto length_end = category["length"].end();

        int last_count = 0;

        // Hopefully unnecessary since they should be of the same length
        while(count_it != count_end && length_it != length_end) {
            box_diagram[key] += {*length_it, (int) *count_it - last_count};

            last_count = (int) *count_it;
            count_it++;
            length_it++;
        }
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

    // TODO: Clean this up
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

        performance[method]["count"] += std::stoi(count); //TODO: take last element minus this
    }

    return performance;
}

void FileHandler::add_performance_file(std::string &file, std::string &file_name) {
    std::string site_id = get_id_from_performance(file_name);

    // Add the host to the corresponding site if it exists
    // TODO: Parse and add the real data

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
