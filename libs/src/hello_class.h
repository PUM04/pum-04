#ifndef HELLOCLASS_
#define HELLOCLASS_

#include <iostream>

class HelloClass {
public:
  HelloClass(int number, std::string text);

  void increase_num(int amount);

  auto multiply_num(int amount) -> int;

  int get_number() const;

  std::string get_text() const;

private:
  int number;
  std::string text;
};

#endif
