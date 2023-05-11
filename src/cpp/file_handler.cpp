#include "file_handler.h"
#include <iostream>
#include <vector>
#include <regex>
#include "nlohmann/json.h"
#include <ctime>
#include <sstream>
#include <limits>
#include <map>

#define DEBUG

void FileHandler::AddFile(std::string file, std::string file_name)
{
    std::string file_ending = GetFileEnding(file_name);

    if (file_ending == "txt")
    {
        performance_files.push_back({file_name, file});
    }
    else if (file_ending == "json")
    {
        host_files.push_back({file_name, file});
    }

#ifdef DEBUG
    std::cout << "Added file " << file_name << "." << std::endl;
#endif
}

void FileHandler::ComputeFiles()
{
    for (auto file : host_files)
    {
        AddHostFile(file.file);
    }

    for (auto file : performance_files)
    {
        AddPerformanceFile(file.file, file.name);
    }

    host_files = {};
    performance_files = {};

#ifdef DEBUG
    std::cout << "Linked the host and performance files." << std::endl;
#endif
}

std::string FileHandler::GetInfoBox(std::string site_id) {
    // Make sure the site exists
    if (sites.find(site_id) == sites.end()) {
        #ifdef DEBUG
        std::cout << "Could not find site with id " << site_id << std::endl;
        #endif
        return "{}";
    }

    struct Site site = sites.at(site_id);

    // Return the cached version if it exists
    if (site.info_box != NULL) {
        return site.info_box.dump();
    }

    json info_box;
    info_box["site_name"] = site.hosts["site_name"];

    info_box["min_ram"] = std::numeric_limits<int>::max();
    info_box["max_ram"] = 0.0;
    info_box["total_ram"] = 0.0;

    info_box["min_cpu"] = std::numeric_limits<int>::max();
    info_box["max_cpu"] = 0;
    info_box["total_cpu"] = 0;

    info_box["hosts"] = 0;

    for (auto host : site.hosts["nodes"]) {
        if (host["memory"] < info_box["min_ram"] ) {
            info_box["min_ram"] = host["memory"];
        } else if (host["memory"] > info_box["max_ram"]) {
            info_box["max_ram"] = host["memory"];
        }

        info_box["total_ram"] = (double) info_box["total_ram"] + (double) host["memory"];

        if (host["cpu"] < info_box["min_cpu"] ) {
            info_box["min_cpu"] = host["cpu"];
        } else if (host["cpu"] > info_box["max_cpu"]) {
            info_box["max_cpu"] = host["cpu"];
        }

        info_box["total_cpu"] = (int) info_box["total_cpu"] + (int) host["cpu"];
        info_box["hosts"] = (int) info_box["hosts"] + 1;
    }

    info_box["average_ram"] = (double) info_box["total_ram"] / (double) info_box["hosts"];
    info_box["average_cpu"] = (double) info_box["total_cpu"] / (double) info_box["hosts"];

    // Round to two decimal places
    info_box["average_ram"] = round((double) info_box["average_ram"] * 100) / 100; 
    info_box["average_cpu"] = round((double) info_box["average_cpu"] * 100) / 100; 

    // Cache the results
    site.info_box = info_box;

    return info_box.dump();
}

std::string FileHandler::GetHistogram(std::string site_id) const
{
    if (!isSiteValid(site_id)) {
        return "{}";
    }

    struct Site site = sites.at(site_id);
    json categories;

    CalculateCategories(site, categories);

    return categories.dump();
}

std::string FileHandler::GetBoxDiagram(std::string site_id) const
{
    if (!isSiteValid(site_id)) {
        return "{}";
    }

    struct Site site = sites.at(site_id);
    json categories;
    json box_diagram;

    CalculateCategories(site, categories);

    for (auto &el : categories.items())
    {
        box_diagram[el.key()]["average"] = GetBoxAverage(el.value());
        box_diagram[el.key()]["median"] = GetBoxMedian(el.value());
        box_diagram[el.key()]["first_quartile"] = GetBoxFirstQuartile(el.value());
        box_diagram[el.key()]["third_quartile"] = GetBoxThirdQuartile(el.value());
        box_diagram[el.key()]["min"] = GetBoxMin(el.value());
        box_diagram[el.key()]["max"] = GetBoxMax(el.value());
    }
    return box_diagram.dump();
}

bool FileHandler::isSiteValid(std::string site_id) const 
{
    auto site_it = sites.find(site_id);

    // Check if the site exists
    if (site_it == sites.end())
    {
#ifdef DEBUG
        std::cout << "Could not find site with id " << site_id << std::endl;
#endif
        return false;
    }

    if (site_it->second.logs.empty())
    {
#ifdef DEBUG
        std::cout << "Could not found any performance data for site with id " << site_id << std::endl;
#endif
        return false;
    }
    
    return true;
}

void FileHandler::CalculateCategories(struct Site &site, json &categories) const
{
    // Populate with the different categories
    for (json log : site.logs)
    {
        for (auto &el : log.items())
        {
            categories[el.key()] = {};
        }
    }

    for (auto &el : categories.items())
    {
        MergeCategory(site, el.key(), categories);
    }
}

double FileHandler::GetBoxAverage(json &category) const
{
    int sum = 0;

    for (auto pair : category["data"])
    {
        // Do not count the infinte length because it will skew the results
        if ((int)pair["length"] == std::numeric_limits<int>::max())
        {
            continue;
        }

        sum += (int)pair["length"] * (int)pair["count"];
    }
    return sum / ((double)category["total"]);
}

int FileHandler::GetBoxLimit(json &category, double limit) const
{
    const int ktotal = (int)category["total"];
    int sum = 0;

    for (auto pair : category["data"])
    {
        sum += (int)pair["count"];

        if (sum >= ktotal * limit)
        {
            return (int)pair["length"];
        }
    }
    return 0;
}

int FileHandler::GetBoxMedian(json &category) const
{
    return GetBoxLimit(category, 0.5);
}

int FileHandler::GetBoxFirstQuartile(json &category) const
{
    return GetBoxLimit(category, 0.25);
}

int FileHandler::GetBoxThirdQuartile(json &category) const
{
    return GetBoxLimit(category, 0.75);
}

int FileHandler::GetBoxMin(json &category) const
{
    for (auto pair : category["data"])
    {
        if (pair["count"] != 0)
        {
            return (int)pair["length"];
        }
    }
    return 0;
}

int FileHandler::GetBoxMax(json &category) const
{
    auto data = category["data"];

    // Loop through the data backwards
    for (auto it = data.rbegin(); it != data.rend(); it++)
    {
        if ((*it)["count"] != 0)
        {
            return (int)(*it)["length"];
        }
    }
    return 0;
}

void FileHandler::MergeCategory(struct Site &site, std::string key, json &result) const
{
    result[key] = {};
    result[key]["total"] = 0;

    std::map<int, int> length_count;

    for (json log : site.logs)
    {
        json category = log[key];

        auto count_it = category["count"].begin();
        const auto kcount_end = category["count"].end();

        auto length_it = category["length"].begin();
        const auto klength_end = category["length"].end();

        int last_count = 0;
        // Maybe parse the sum instead of recalculating it here?
        int sum = 0;

        // Hopefully unnecessary since they should be of the same length
        // Calculate the real count from the aggregation
        // Align the length to the count in pairs
        while (count_it != kcount_end && length_it != klength_end)
        {
            int new_count = (int)*count_it - last_count;

            // Illegal nesting
            if (length_count.find(*length_it) == length_count.end())
            {
                length_count[*length_it] = new_count;
            }
            else
            {
                length_count[*length_it] += new_count;
            }

            last_count = (int)*count_it;
            sum += new_count;

            count_it++;
            length_it++;
        }
        result[key]["total"] = (int)result[key]["total"] + sum;
    }

    // Add the data to the json object
    for (auto const &kentry : length_count)
    {
        result[key]["data"] += {
            {"length", kentry.first},
            {"count", kentry.second}};
    }
}

std::string FileHandler::GetFileEnding(std::string &file_name) const
{
    return file_name.substr(file_name.rfind(".") + 1);
}

void FileHandler::AddHostFile(std::string &file)
{
    json hosts;
    try
    {
        hosts = json::parse(file);
    }
    catch (json::parse_error &e)
    {
        std::cerr << "Could not parse hosts file: " << e.what() << std::endl;
        return;
    }
    std::string site_id = hosts["site_id"];

    // Add the site if it does not already exist
    if (sites.find(site_id) == sites.end())
    {
        sites[site_id] = {hosts, {}};

#ifdef DEBUG
        std::cout << "Added site with id " << site_id << "." << std::endl;
#endif
    }
    else
    {
#ifdef DEBUG
        std::cout << "Site with id " << site_id << " already exist." << std::endl;
#endif
    }
}

json FileHandler::GetPerformanceJson(std::string &content) const
{
    std::vector<std::string> methods;
    std::vector<std::string> buckets;

    std::istringstream content_stream(content);
    std::string line;

    json performance;

    while (std::getline(content_stream, line))
    {
        if (line.find(",le=") == std::string::npos)
        {
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

        if (length == "+Inf")
        {
            performance[method]["length"] += std::numeric_limits<int>::max();
        }
        else
        {
            performance[method]["length"] += std::stoi(length);
        }

        performance[method]["count"] += std::stoi(count);
    }

    return performance;
}

void FileHandler::AddPerformanceFile(std::string &file, std::string &file_name)
{
    std::string site_id = GetIdFromPerformance(file_name);
    // Add the host to the corresponding site if it exists

    if (sites.find(site_id) != sites.end())
    {
        json performance = GetPerformanceJson(file);
        sites[site_id].logs.insert(performance);

#ifdef DEBUG
        std::cout << "Linked log " << file_name << " to " << site_id << "." << std::endl;
#endif
    }
    else
    {
#ifdef DEBUG
        std::cout << "The site with id " << site_id << " does not exist." << std::endl;
#endif
    }
}

std::string FileHandler::GetIdFromPerformance(std::string &file_name) const
{
    return file_name.substr(0, file_name.find("_"));
}

std::string FileHandler::GetSites() const {
    json site_data;
    std::vector<std::unordered_map<std::string, std::string>> site_vector;
    site_data["sites"] = site_vector;

    for (auto const site : sites)
    {
        json hosts = site.second.hosts;
        if (hosts.contains("site_name")) {
            std::unordered_map<std::string, std::string> site_map;
            site_map.insert(
                {{"name", hosts["site_name"]}, {"id", hosts["site_id"]}});
            site_data["sites"].push_back(site_map);
        } else {
            #ifdef DEBUG
            std::cerr << "The site with id " << site.first
                      << " is missing the key 'site_name'." << std::endl;
        #endif
        }
    }
    return site_data.dump();
}

std::string FileHandler::GetMetrics() const
{
    std::set<std::string> metrics;

    for (auto site : sites)
    {
        json categories;
        CalculateCategories(site.second, categories);
        // add all metric names
        for (auto &el : categories.items())
        {
            metrics.insert(el.key());
        }
    }

    json metric_json;
    metric_json["metrics"] = metrics;

    return metric_json.dump();
}
