#include "doctest.h"
#include "../src/hello_class.h"

TEST_CASE("Testing HelloClass 2") {
  auto *test = new HelloClass(1, "test");

  // Specify things that must be correct for the following tests to be run
  // If a REQUIRE fails the test will terminate
  REQUIRE(test->get_number() == 1);
  REQUIRE(test->get_text() == "test");

  // It is possible to warn without actually counting it as a failed test
  WARN(test->get_number() > 0);

  // For each subcase the testcase will be executed from the start
  SUBCASE("Test multiplication 2") {
    CHECK(test->multiply_num(3) == 3);
    CHECK(test->multiply_num(2) == 6);
    CHECK(test->multiply_num(-1) == -6);
  }
}
