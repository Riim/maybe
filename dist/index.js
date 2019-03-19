"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@riim/is");
function eq(a, b) {
    if (is_1.is(a, b)) {
        return true;
    }
    if (a && typeof a.equals == 'function') {
        return a.equals(b);
    }
    if (b && typeof b.equals == 'function') {
        return b.equals(b);
    }
    if (a.length !== undefined && a.length === b.length) {
        for (let i = 0, l = a.length; i < l; i++) {
            if (!eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}
class Just {
    constructor(value) {
        this._value = value;
    }
    isJust() {
        return true;
    }
    isNothing() {
        return false;
    }
    forEach(notSkipNothing, f) {
        (typeof notSkipNothing == 'function' ? notSkipNothing : f)(this._value);
        return this;
    }
    map(notSkipNothing, f) {
        return maybe((typeof notSkipNothing == 'function' ? notSkipNothing : f)(this._value));
    }
    flatMap(notSkipNothing, f) {
        return (typeof notSkipNothing == 'function' ? notSkipNothing : f)(this._value);
    }
    filter(notSkipNothing, p) {
        return (typeof notSkipNothing == 'function' ? notSkipNothing : p)(this._value)
            ? this
            : exports.nothing;
    }
    just(_err) {
        return this._value;
    }
    orJust(_value) {
        return this._value;
    }
    orElse(_maybe) {
        return this;
    }
    orOf(_value) {
        return this;
    }
    equals(other) {
        return other instanceof Just && eq(this._value, other._value);
    }
    valueOf() {
        return this._value;
    }
    toString() {
        return `Just(${this._value})`;
    }
}
exports.Just = Just;
function just(value) {
    if (value == null) {
        throw new TypeError('Cannot create Just with a null or undefined value');
    }
    return new Just(value);
}
exports.just = just;
class Nothing {
    constructor() {
        if (exports.nothing) {
            throw new TypeError('Nothing is a singleton');
        }
    }
    isJust() {
        return false;
    }
    isNothing() {
        return true;
    }
    forEach(notSkipNothing, f) {
        if (notSkipNothing === true) {
            f(null);
        }
        return this;
    }
    map(notSkipNothing, f) {
        if (notSkipNothing === true) {
            return maybe(f(null));
        }
        return this;
    }
    flatMap(notSkipNothing, f) {
        if (notSkipNothing === true) {
            return f(null);
        }
        return this;
    }
    filter(notSkipNothing, p) {
        if (notSkipNothing === true) {
            return p(null) ? this : exports.nothing;
        }
        return this;
    }
    just(err) {
        throw err || new TypeError('Cannot call "just" on a Nothing');
    }
    orJust(value) {
        return value;
    }
    orElse(maybe) {
        return maybe;
    }
    orOf(value) {
        return maybe(value);
    }
    equals(other) {
        return other === exports.nothing;
    }
    valueOf() {
        return null;
    }
    toString() {
        return 'Nothing';
    }
}
exports.Nothing = Nothing;
exports.nothing = new Nothing();
function maybe(value) {
    return value == null ? exports.nothing : new Just(value);
}
exports.maybe = maybe;
