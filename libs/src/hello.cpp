#include <iostream>
#include <string>

#include "hello_class.h"

auto main() -> int {
  std::cout << "test" << std::endl;

  auto *test = new HelloClass(3, "test");
  test->increase_num(5);

  return 0;
}
