#define _TESTING_

#include <string>
#include "../test_framework/doctest.h"
#include "../FileHandler.cpp"


TEST_CASE("FileHandler") {
    FileHandler *fh = new FileHandler();

    SUBCASE("Simple box diagram with one log file") {
        std::string performance = 
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"2\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"3\"} 3\n"
            "response_time_bucket{method=\"Test\",le=\"4\"} 6\n"
            "response_time_bucket{method=\"Test\",le=\"5\"} 6\n"
            "response_time_bucket{method=\"Test\",le=\"6\"} 8\n"
        ;
        std::string performance_name = "test123_230102.txt";

        std::string host = "{\"site_name\": \"test\", \"site_id\": \"test123\"}";
        std::string host_name = "test.json";

        fh->add_file(performance, performance_name);
        fh->add_file(host, host_name);
        fh->compute_files();
        json box = json::parse(fh->get_box_diagram("test123"));

        CHECK(box["Test"]["min"] == 1);
        CHECK(box["Test"]["max"] == 6);
        CHECK(box["Test"]["median"] == 4);
        CHECK(box["Test"]["average"] == 3.875);
        CHECK(box["Test"]["first_quartile"] == 3);
        CHECK(box["Test"]["third_quartile"] == 4);
    }

    SUBCASE("Simple box diagram with two log files") {
        std::string performance1 = 
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"2\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"3\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"4\"} 2\n"
            "response_time_bucket{method=\"Test\",le=\"5\"} 2\n"
            "response_time_bucket{method=\"Test\",le=\"6\"} 4\n"
        ;
        std::string performance_name1 = "test123_230102.txt";

        std::string performance2 = 
            "response_time_bucket{method=\"Test\",le=\"1\"} 0\n"
            "response_time_bucket{method=\"Test\",le=\"2\"} 0\n"
            "response_time_bucket{method=\"Test\",le=\"3\"} 2\n"
            "response_time_bucket{method=\"Test\",le=\"4\"} 4\n"
            "response_time_bucket{method=\"Test\",le=\"5\"} 4\n"
            "response_time_bucket{method=\"Test\",le=\"6\"} 4\n"
        ;
        std::string performance_name2 = "test123_230103.txt";

        std::string host = "{\"site_name\": \"test\", \"site_id\": \"test123\"}";
        std::string host_name = "test.json";

        fh->add_file(performance1, performance_name1);
        fh->add_file(performance2, performance_name2);
        fh->add_file(host, host_name);
        fh->compute_files();
        json box = json::parse(fh->get_box_diagram("test123"));

        CHECK(box["Test"]["min"] == 1);
        CHECK(box["Test"]["max"] == 6);
        CHECK(box["Test"]["median"] == 4);
        CHECK(box["Test"]["average"] == 3.875);
        CHECK(box["Test"]["first_quartile"] == 3);
        CHECK(box["Test"]["third_quartile"] == 4);
    }

    delete fh;
}