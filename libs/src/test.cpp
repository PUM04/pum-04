#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "../doctest.h"

#include "hello_class.h"

TEST_CASE("Testing HelloClass") {
  auto *test = new HelloClass(1, "test");

  // Specify things that must be correct for the following tests to be run
  // If a REQUIRE fails the test will terminate
  REQUIRE(test->get_number() == 1);
  REQUIRE(test->get_text() == "test");

  // It is possible to warn without actually counting it as a failed test
  WARN(test->get_number() > 0);

  // For each subcase the testcase will be executed from the start
  SUBCASE("Test multiplication") {
    CHECK(test->multiply_num(2) == 2);
    CHECK(test->multiply_num(3) == 6);
    CHECK(test->multiply_num(1) == 6);
  }

  SUBCASE("Test multiplication") {
    // Notice that the value was reset to 1 once again
    test->increase_num(3);
    CHECK(test->get_number() == 4);

    test->increase_num(2);
    CHECK(test->get_number() == 6);

    test->increase_num(0);
    CHECK(test->get_number() == 6);
  }

  // Subcases can also be nested
  SUBCASE("Nested") {
    SUBCASE("NEST 1") {
      CHECK(test->multiply_num(0) == 0);

      test->increase_num(3);
      CHECK(test->get_number() == 3);
    }

    SUBCASE("NEST 2") {
      CHECK(test->multiply_num(2) == 2);
      CHECK(test->multiply_num(1) == 2);
    }
  }
}
