import { is } from '@riim/is';

function eq(a: any, b: any): boolean {
	if (is(a, b)) {
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

export type TMaybe<T> = Just<T> | Nothing<T>;

export class Just<T> {
	readonly _value: T;

	constructor(value: T) {
		this._value = value;
	}

	isJust(): boolean {
		return true;
	}

	isNothing(): boolean {
		return false;
	}

	forEach(notSkipNothing: boolean, f: (value: T | null) => void): TMaybe<T>;
	forEach(f: (value: T) => void): TMaybe<T>;
	forEach(
		notSkipNothing: boolean | ((value: T | null) => void),
		f?: (value: T | null) => void
	): TMaybe<T> {
		(typeof notSkipNothing == 'function' ? notSkipNothing : f)!(this._value);
		return this;
	}

	map<U>(notSkipNothing: boolean, f: (value: T | null) => U | null | undefined): TMaybe<U>;
	map<U>(f: (value: T) => U | null | undefined): TMaybe<U>;
	map<U>(
		notSkipNothing: boolean | ((value: T | null) => U | null | undefined),
		f?: (value: T | null) => U | null | undefined
	): TMaybe<U> {
		return maybe((typeof notSkipNothing == 'function' ? notSkipNothing : f)!(this._value));
	}

	flatMap<U>(notSkipNothing: boolean, f: (value: T | null) => TMaybe<U>): TMaybe<U>;
	flatMap<U>(f: (value: T) => TMaybe<U>): TMaybe<U>;
	flatMap<U>(
		notSkipNothing: boolean | ((value: T | null) => TMaybe<U>),
		f?: (value: T | null) => TMaybe<U>
	): TMaybe<U> {
		return (typeof notSkipNothing == 'function' ? notSkipNothing : f)!(this._value);
	}

	filter(notSkipNothing: boolean, p: (value: T | null) => boolean): TMaybe<T>;
	filter(p: (value: T) => boolean): TMaybe<T>;
	filter(
		notSkipNothing: boolean | ((value: T | null) => boolean),
		p?: (value: T | null) => boolean
	): TMaybe<T> {
		return (typeof notSkipNothing == 'function' ? notSkipNothing : p)!(this._value)
			? this
			: nothing;
	}

	just(_err?: any): T {
		return this._value;
	}

	orJust<U>(_value: U): T | U {
		return this._value;
	}

	orElse<U>(_maybe: TMaybe<U>): TMaybe<T | U> {
		return this;
	}

	orOf<U>(_value: U): TMaybe<T | U> {
		return this;
	}

	equals(other: any): boolean {
		return other instanceof Just && eq(this._value, other._value);
	}

	valueOf() {
		return this._value;
	}

	toString() {
		return `Just(${this._value})`;
	}
}

export function just<T>(value: T | null | undefined): Just<T> {
	if (value == null) {
		throw new TypeError('Cannot create Just with a null or undefined value');
	}

	return new Just(value);
}

export class Nothing<T> {
	constructor() {
		if (nothing) {
			throw new TypeError('Nothing is a singleton');
		}
	}

	isJust(): boolean {
		return false;
	}

	isNothing(): boolean {
		return true;
	}

	forEach(notSkipNothing: boolean, f: (value: T | null) => void): TMaybe<T>;
	forEach(f: (value: T) => void): TMaybe<T>;
	forEach(
		notSkipNothing: boolean | ((value: T | null) => void),
		f?: (value: T | null) => void
	): TMaybe<T> {
		if (notSkipNothing === true) {
			f!(null);
		}

		return this;
	}

	map<U>(notSkipNothing: boolean, f: (value: T | null) => U | null | undefined): TMaybe<U>;
	map<U>(f: (value: T) => U | null | undefined): TMaybe<U>;
	map<U>(
		notSkipNothing: boolean | ((value: T | null) => U | null | undefined),
		f?: (value: T | null) => U | null | undefined
	): TMaybe<U> {
		if (notSkipNothing === true) {
			return maybe(f!(null));
		}

		return this as any;
	}

	flatMap<U>(notSkipNothing: boolean, f: (value: T | null) => TMaybe<U>): TMaybe<U>;
	flatMap<U>(f: (value: T) => TMaybe<U>): TMaybe<U>;
	flatMap<U>(
		notSkipNothing: boolean | ((value: T | null) => TMaybe<U>),
		f?: (value: T | null) => TMaybe<U>
	): TMaybe<U> {
		if (notSkipNothing === true) {
			return f!(null);
		}

		return this as any;
	}

	filter(notSkipNothing: boolean, p: (value: T | null) => boolean): TMaybe<T>;
	filter(p: (value: T) => boolean): TMaybe<T>;
	filter(
		notSkipNothing: boolean | ((value: T | null) => boolean),
		p?: (value: T | null) => boolean
	): TMaybe<T> {
		if (notSkipNothing === true) {
			return p!(null) ? this : nothing;
		}

		return this;
	}

	just(err?: any): T {
		throw err || new TypeError('Cannot call "just" on a Nothing');
	}

	orJust<U>(value: U): T | U {
		return value;
	}

	orElse<U>(maybe: TMaybe<U>): TMaybe<T | U> {
		return maybe;
	}

	orOf<U>(value: U): TMaybe<T | U> {
		return maybe<U>(value);
	}

	equals(other: any): boolean {
		return other === nothing;
	}

	valueOf() {
		return null;
	}

	toString() {
		return 'Nothing';
	}
}

export const nothing = new Nothing<any>();

export function maybe<T>(value: T | null | undefined): TMaybe<T> {
	return value == null ? nothing : new Just(value);
}
