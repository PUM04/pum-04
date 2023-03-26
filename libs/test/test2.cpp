#include "doctest.h"

struct Counter {
    int count;

    int add(int i) {
        return this->count += i;
    }
};

TEST_CASE("Test Multiply Function") {
    struct Counter counter;
    counter.count = 1;

    // Specify requirements for the following tests 
    // If this fails the test case will terminate
    REQUIRE(counter.count == 1);

    // Subcases can also be nested
    SUBCASE("Test Positive Adding") {
        SUBCASE("Test Small Numbers") {
            CHECK(counter.add(1) == 2);
        }
        SUBCASE("Test Big Numbers") {
            CHECK(counter.add(999) == 1000);
        }
    }

    // For each subcase the testcase is executed from the start
    // Notice that the counter was reset to one again
    SUBCASE("Test Negative Adding") {
        CHECK(counter.add(-1) == 0);
        CHECK(counter.add(-3) == -3);
    }
}
