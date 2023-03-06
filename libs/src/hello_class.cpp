#include <iostream>
#include <string>
#include <utility>

#include "hello_class.h"

HelloClass::HelloClass(int num, std::string text)
    : number(num), text(std::move(std::move(text))) {}

void HelloClass::increase_num(int num_amount) {
  for (int i = 0; i < num_amount; i++) {
    this->number++;
    std::cout << "increase " << this->number << std::endl;
  }
}

auto HelloClass::multiply_num(int amount) -> int {
  this->number *= amount;
  return this->number;
}

int HelloClass::get_number() const { return this->number; }

std::string HelloClass::get_text() const { return this->text; }
