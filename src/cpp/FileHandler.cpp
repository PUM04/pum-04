#include "FileHandler.h"
#include <iostream>
#include <vector>
#include <regex>
#include "nlohmann/json.h"

#define DEBUG

void FileHandler::add_file(std::string file, std::string file_name) {
    std::string file_ending = get_file_ending(file_name);

    if (file_ending == "txt") {
        performance_files.push_back({file, file_name});
    } else if (file_ending == "json") {
        host_files.push_back({file, file_name});
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
}

//add to header? TODO: try to run


bool FileHandler::regExFromString(std::string &fileContent,std::regex &regex){
    //std::regex methodName("[A-z]+(?=\",le=)");
    //std::regex bucket("([0-9]+|+Inf)(?=\"})"); //both seem to work
    for(std::sregex_iterator i = std::sregex_iterator(fileContent.begin(), fileContent.end(), regex);
                            i != std::sregex_iterator();
                            ++i)
    {
        std::cout << i->str(1)  << std::endl;
    }
    return 1;
}

std::string FileHandler::get_file_ending(std::string &file_name) const {
    return file_name.substr(file_name.find(".") + 1);
}

void FileHandler::add_host_file(std::string &file) {
    json hosts= json::parse(file);
    std::string site_id = hosts["site_id"];

    // Add the site if it does not already exist
    if (sites.find(site_id) == sites.end()) {
        sites["site_id"] = {site_id, {}};

        #ifdef DEBUG
        std::cout << "Added site with id " << site_id << "." << std::endl;
        #endif
    } else {
        #ifdef DEBUG
        std::cout << "Site with id " << site_id << " already exist." << std::endl;
        #endif
    }
}

void FileHandler::add_performance_file(std::string &file, std::string &file_name) {
    std::string site_id = get_id_from_performance(file_name);

    // Add the host to the corresponding site if it exists
    // TODO: Parse and add the real data
    if (sites.find(site_id) != sites.end()) {
        json test = {
            {"a", 1},
            {"b", 2}
        };
        sites[site_id].hosts.push_back(test);
    } else {
        #ifdef DEBUG
        std::cout << "The site with id " << site_id << " does not exist." << std::endl;
        #endif
    }
}

std::string FileHandler::get_id_from_performance(std::string &file_name) const {
    return  file_name.substr(0, file_name.find("_"));
}
