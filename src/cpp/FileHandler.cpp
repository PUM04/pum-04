#include "FileHandler.h"
#include <iostream>
#include <vector>

void FileHandler::add_file(std::string file) {
    std::cout << file;
    /*
    Get metric/method name (?<={(metric|method)=")\w*(?=",le="(\d*|\+Inf)"} \d*\n)
    Get length (?<={(metric|method)="\w*",le=")(\d*|\+Inf)(?=")
    Get count for both metrics and methods: (?<={(metric|method)="\w*",le="(\d*|\+Inf)"} )\d*\n
    */
}