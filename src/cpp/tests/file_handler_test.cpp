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

        json site_data = json::parse(fh->GetSites());

        CHECK(site_data["sites"].size() == 1);
        CHECK(site_data["sites"][0]["name"] == "test1");

        std::string host2 =
            "{\"site_name\": \"test2\", \"site_id\": \"test_id_2\"}";
        std::string host_name2 = "test2.json";
        fh->AddFile(host2, host_name2);
        fh->ComputeFiles();
        json site_data2 = json::parse(fh->GetSites());

        CHECK(site_data2["sites"].size() == 2);
        CHECK(site_data2["sites"][1]["name"] == "test1");
        CHECK(site_data2["sites"][0]["name"] == "test2");
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

        CHECK(metrics["metrics"].size() == 4);
        CHECK(metrics["metrics"][0] == "Test");
        CHECK(metrics["metrics"][1] == "Test1");
        CHECK(metrics["metrics"][2] == "Test2");
        CHECK(metrics["metrics"][3] == "Test3");
    }

    SUBCASE("Get info box for a site") {
        std::string host = 
            "{\n"
              "\"site_id\": \"4b14a8\",\n"
              "\"site_name\": \"rta\",\n"
              "\"baseline_version\": \"25.1\",\n"
              "\"type\": \"openstack\",\n"
              "\"nodes\": {\n"
                "\"pacscore\": {\n"
                  "\"os\": \"win2019\",\n"
                  "\"cpu\": 4,\n"
                  "\"memory\": 7.5,\n"
                  "\"services\": [\n"
                    "\"sql2019\",\n"
                    "\"wise\"\n"
                  "]\n"
                "},\n"
                "\"ad\": {\n"
                  "\"os\": \"win2019\",\n"
                  "\"cpu\": 2,\n"
                  "\"memory\": 4\n"
                "}\n"
              "}\n"
            "}\n";

        fh->AddFile(host, "rta.json");
        fh->ComputeFiles();
        json info_box = json::parse(fh->GetInfoBox("4b14a8"));

        CHECK(info_box["site_name"] == "rta");
        CHECK(info_box["min_ram"] == 4);
        CHECK(info_box["max_ram"] == 7.5);
        CHECK(info_box["total_ram"] == 11.5);
        CHECK(info_box["average_ram"] == 5.75);

        CHECK(info_box["min_cpu"] == 2);
        CHECK(info_box["max_cpu"] == 4);
        CHECK(info_box["total_cpu"] == 6);
        CHECK(info_box["average_cpu"] == 3);

        CHECK(info_box["hosts"] == 2);
    }

    SUBCASE("Combine multiple sites") {
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

        std::vector<std::string> site_ids = {"testid1", "testid2"};
        json result = json::parse(fh->CombineSites(site_ids));
        
        CHECK(result["combined_sites"]["combined_1"].size() == 2);
        CHECK(result["combined_sites"]["combined_1"][0] == "testid1");
        CHECK(result["combined_sites"]["combined_1"][1] == "testid2");
    }

    SUBCASE("get combined site data") {
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

        std::vector<std::string> site_ids = {"testid1", "testid2"};
        fh->CombineSites(site_ids);

        json result = json::parse(fh->GetHistogram("combined_1"));
        std::cout << result.dump() << std::endl;

        
    }

    delete fh;
}
