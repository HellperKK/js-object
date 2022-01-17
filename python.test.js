const { test, expect } = require("@jest/globals")
const { make_class } = require("./python")

const Range = make_class({
    init: (self, min, max) => {
        self.min = min
        self.max = max
    },
    include: (self, value) => {
        return self.min <= value && self.max > value
    }
})

const RangeChild = make_class({}, Range)

const SteppedRange = make_class({
    init: (self, min, max, step) => {
        Range.init(self, min, max)
        self.step = step
    },
    include: (self, value) => {
        return Range.include(self, value) && (value - self.min) % self.step === 0
    }
}, Range)

test('test range creation', () => {
    const r = Range.new(10, 20)
    expect(r.min).toEqual(10)
    expect(r.max).toEqual(20)
})

test('test range inclusion', () => {
    const r = Range.new(10, 20)
    expect(r.min).toEqual(10)
    expect(r.max).toEqual(20)
    expect(r.include(15)).toEqual(true)
    expect(r.include(42)).toEqual(false)
})

test('test range cration with inheritance', () => {
    const r = RangeChild.new(10, 20)
    expect(r.min).toEqual(10)
    expect(r.max).toEqual(20)
})

test('test use of "super"', () => {
    const r = SteppedRange.new(10, 20, 3) //10, 13, 16, 19
    expect(r.min).toEqual(10)
    expect(r.max).toEqual(20)
    expect(r.include(19)).toEqual(true)
    expect(r.include(14)).toEqual(false)
})