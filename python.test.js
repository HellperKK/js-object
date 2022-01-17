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

test('test range cration', () => {
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