#include <emscripten/bind.h>


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