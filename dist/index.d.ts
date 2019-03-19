export declare type TMaybe<T> = Just<T> | Nothing<T>;
export declare class Just<T> {
    readonly _value: T;
    constructor(value: T);
    isJust(): boolean;
    isNothing(): boolean;
    forEach(notSkipNothing: boolean, f: (value: T | null) => void): TMaybe<T>;
    forEach(f: (value: T) => void): TMaybe<T>;
    map<U>(notSkipNothing: boolean, f: (value: T | null) => U | null | undefined): TMaybe<U>;
    map<U>(f: (value: T) => U | null | undefined): TMaybe<U>;
    flatMap<U>(notSkipNothing: boolean, f: (value: T | null) => TMaybe<U>): TMaybe<U>;
    flatMap<U>(f: (value: T) => TMaybe<U>): TMaybe<U>;
    filter(notSkipNothing: boolean, p: (value: T | null) => boolean): TMaybe<T>;
    filter(p: (value: T) => boolean): TMaybe<T>;
    just(_err?: any): T;
    orJust<U>(_value: U): T | U;
    orElse<U>(_maybe: TMaybe<U>): TMaybe<T | U>;
    orOf<U>(_value: U): TMaybe<T | U>;
    equals(other: any): boolean;
    valueOf(): T;
    toString(): string;
}
export declare function just<T>(value: T | null | undefined): Just<T>;
export declare class Nothing<T> {
    constructor();
    isJust(): boolean;
    isNothing(): boolean;
    forEach(notSkipNothing: boolean, f: (value: T | null) => void): TMaybe<T>;
    forEach(f: (value: T) => void): TMaybe<T>;
    map<U>(notSkipNothing: boolean, f: (value: T | null) => U | null | undefined): TMaybe<U>;
    map<U>(f: (value: T) => U | null | undefined): TMaybe<U>;
    flatMap<U>(notSkipNothing: boolean, f: (value: T | null) => TMaybe<U>): TMaybe<U>;
    flatMap<U>(f: (value: T) => TMaybe<U>): TMaybe<U>;
    filter(notSkipNothing: boolean, p: (value: T | null) => boolean): TMaybe<T>;
    filter(p: (value: T) => boolean): TMaybe<T>;
    just(err?: any): T;
    orJust<U>(value: U): T | U;
    orElse<U>(maybe: TMaybe<U>): TMaybe<T | U>;
    orOf<U>(value: U): TMaybe<T | U>;
    equals(other: any): boolean;
    valueOf(): null;
    toString(): string;
}
export declare const nothing: Nothing<any>;
export declare function maybe<T>(value: T | null | undefined): TMaybe<T>;
