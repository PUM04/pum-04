#include <emscripten/bind.h>
#include "test_framework/doctest.h"


// compile this with
// emcc -lembind -o Calculator.js Calculator.cpp -s EXPORT_ES6=1 -s MODULARIZE=1

int increment(int i)
{
    return ++i;
}

class Calculator
{
public:
    Calculator()
    {
    }

    int add(int x, int y)
    {
        return x + y;
    }

    int subtract(int x, int y)
    {
        return x - y;
    }
};

using namespace emscripten;
EMSCRIPTEN_BINDINGS(calculator)
{
    function("increment", &increment);
    class_<Calculator>("Calculator").constructor().function("add", &Calculator::add).function("subtract", &Calculator::subtract);
}

TEST_CASE("Calculator") {
    Calculator *c  = new Calculator();

    SUBCASE("Add") {
        CHECK(c->add(1, 1) == 2);
        CHECK(c->add(1, -1) == 0);
        CHECK(c->add(2147483647, 1) == -2147483648);
    }

    SUBCASE("subtract") {
        CHECK(c->subtract(1, 1) == 0);
        CHECK(c->subtract(1, -1) == 2);
    }

    delete c;
}
