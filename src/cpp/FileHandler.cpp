#include "FileHandler.h"
#include <iostream>
#include <vector>
#include "nlohmann/json.h"

void FileHandler::add_file(std::string file, std::string file_name) {
    std::string file_ending = get_file_ending(file_name);

    if (file_ending == "txt") {

    } else if (file_ending == "json") {
        add_host_file(file);
    }
    /*
    Get metric/method name (?<={(metric|method)=")\w*(?=",le="(\d*|\+Inf)"} \d*\n)
    Get length (?<={(metric|method)="\w*",le=")(\d*|\+Inf)(?=")
    Get count for both metrics and methods: (?<={(metric|method)="\w*",le="(\d*|\+Inf)"} )\d*\n
    
    NEW IMPROVED: (?<={(metric|method)=\")[_[:alnum:]]*(?=\",le="(\d*|\+Inf)"} \d*\n)
    
    */
}


std::string FileHandler::get_file_ending(std::string &file_name) const {
    return file_name.substr(file_name.find(".") + 1);
}

void FileHandler::add_host_file(std::string &file) {
    json hosts= json::parse(file);
    std::string site_id = hosts["site_id"];

    // If the site does not exist, add it
    if (hosts.find(site_id) != hosts.end()) {
        hosts["site_id"] = {site_id, {}};
    }
}