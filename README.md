# js-object

 a js oop experiment

## run

Lanch tests with `npm test`.

## concept

The objective is to try to mimic python's oop system, that is :

- each method takes a first argument that references the instance. That argument is mandatory.
- when acessed from the class, a method stays that way but accessed from an instance the method is bound to the instance and the first parameter no longer needs to be given.

The advantages are that there is no more special keyword like this which can be ambiguous in some cases. Also, giving a method to another object makes sure that method will still aply to the same instance it was bound to.

An example:

```js
const { make_class } = require("./python")

// defining a range class
const Range = make_class({
    init: (self, min, max) => {
        self.min = min
        self.max = max
    },
    include: (self, value) => {
        return self.min <= value && self.max > value
    }
})

// defining a range with step parameter with inheritance
const SteppedRange = make_class({
    init: (self, min, max, step) => {
        // no super, instead parent method is accessed directly from the class
        Range.init(self, min, max)
        self.step = step
    },
    include: (self, value) => {
        return Range.include(self, value) && (value - self.min) % self.step === 0
    }
}, Range)
```
