#define _TESTING_

#include <string>
#include "../test_framework/doctest.h"
#include "../file_handler.cpp"


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

        fh->AddFile(performance, performance_name);
        fh->AddFile(host, host_name);
        fh->ComputeFiles();
        json box = json::parse(fh->GetBoxDiagram("test123"));

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

        fh->AddFile(performance1, performance_name1);
        fh->AddFile(performance2, performance_name2);
        fh->AddFile(host, host_name);
        fh->ComputeFiles();
        json box = json::parse(fh->GetBoxDiagram("test123"));

        CHECK(box["Test"]["min"] == 1);
        CHECK(box["Test"]["max"] == 6);
        CHECK(box["Test"]["median"] == 4);
        CHECK(box["Test"]["average"] == 3.875);
        CHECK(box["Test"]["first_quartile"] == 3);
        CHECK(box["Test"]["third_quartile"] == 4);        
    }

    SUBCASE("Get site names") {
        std::string host1 =
            "{\"site_name\": \"test1\", \"site_id\": \"test_id_1\"}";
        std::string host_name1 = "test1.json";

        fh->AddFile(host1, host_name1);
        fh->ComputeFiles();

        json site_names = json::parse(fh->GetSiteNames());

        CHECK(site_names["names"].size() == 1);
        CHECK(site_names["names"][0] == "test1");

        std::string host2 =
            "{\"site_name\": \"test2\", \"site_id\": \"test_id_2\"}";
        std::string host_name2 = "test2.json";
        fh->AddFile(host2, host_name2);
        fh->ComputeFiles();
        json site_names2 = json::parse(fh->GetSiteNames());

        CHECK(site_names2["names"].size() == 2);
        CHECK(site_names2["names"][1] == "test1");
        CHECK(site_names2["names"][0] == "test2");
    }

    SUBCASE("Get metrics with one file") {
        std::string performance =
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"2\"} 1\n"
            "response_time_bucket{method=\"Test\",le=\"3\"} 3\n"
            "response_time_bucket{method=\"Test\",le=\"4\"} 6\n"
            "response_time_bucket{method=\"Test\",le=\"5\"} 6\n"
            "response_time_bucket{method=\"Test\",le=\"6\"} 8\n"
            "response_time_bucket{method=\"Test1\",le=\"6\"} 1\n"
            "response_time_bucket{method=\"Test2\",le=\"6\"} 1\n";

        std::string performance_name = "test123_230102.txt";

        std::string host =
            "{\"site_name\": \"test\", \"site_id\": \"test123\"}";
        std::string host_name = "test.json";

        fh->AddFile(performance, performance_name);
        fh->AddFile(host, host_name);
        fh->ComputeFiles();
        json metrics = json::parse(fh->GetMetrics());

        CHECK(metrics["metrics"].size() == 3);
        CHECK(metrics["metrics"][0] == "Test");
        CHECK(metrics["metrics"][1] == "Test1");
        CHECK(metrics["metrics"][2] == "Test2");
    }

    SUBCASE("Get metrics with multiple performance files") {
        std::string performance1 =
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test1\",le=\"6\"} 1\n"
            "response_time_bucket{method=\"Test2\",le=\"6\"} 1\n";

        std::string performance1_name = "test1_230102.txt";

        std::string host = "{\"site_name\": \"test\", \"site_id\": \"test1\"}";
        std::string host_name = "test.json";

        fh->AddFile(performance1, performance1_name);
        fh->AddFile(host, host_name);

        std::string performance =
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test1\",le=\"6\"} 1\n"
            "response_time_bucket{method=\"Test3\",le=\"6\"} 1\n";

        std::string performance2_name = "test1_230103.txt";
        fh->AddFile(performance, performance2_name);

        fh->ComputeFiles();
        json metrics = json::parse(fh->GetMetrics());

        CHECK(metrics["metrics"].size() == 4);
        CHECK(metrics["metrics"][0] == "Test");
        CHECK(metrics["metrics"][1] == "Test1");
        CHECK(metrics["metrics"][2] == "Test2");
        CHECK(metrics["metrics"][3] == "Test3");
    }

    SUBCASE("Get metrics with multiple host files") {
        std::string performance1 =
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test1\",le=\"6\"} 1\n"
            "response_time_bucket{method=\"Test2\",le=\"6\"} 1\n";

        std::string performance1_name = "testid1_230102.txt";

        std::string host1 =
            "{\"site_name\": \"test1\", \"site_id\": \"testid1\"}";
        std::string host1_name = "test.json";

        fh->AddFile(performance1, performance1_name);
        fh->AddFile(host1, host1_name);

        std::string performance2 =
            "response_time_bucket{method=\"Test\",le=\"1\"} 1\n"
            "response_time_bucket{method=\"Test1\",le=\"6\"} 1\n"
            "response_time_bucket{method=\"Test3\",le=\"6\"} 1\n";

        std::string performance2_name = "testid2_230103.txt";

        std::string host2 =
            "{\"site_name\": \"test2\", \"site_id\": \"testid2\"}";
        std::string host2_name = "test.json";

        fh->AddFile(performance2, performance2_name);
        fh->AddFile(host2, host2_name);

        fh->ComputeFiles();
        json metrics = json::parse(fh->GetMetrics());
        std::cout << metrics.dump() << std::endl;

        CHECK(metrics["metrics"].size() == 4);
        CHECK(metrics["metrics"][0] == "Test");
        CHECK(metrics["metrics"][1] == "Test1");
        CHECK(metrics["metrics"][2] == "Test2");
        CHECK(metrics["metrics"][3] == "Test3");
    }

    delete fh;
}
