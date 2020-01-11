/**
 * Debounce fn, calling it only once if
 * the given time elapsed between calls.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {Function} debounced function
 */
export function debounce(fn: Function, timeout: number): (...args: any[]) => void;

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param  {Function} fn
 * @param  {Number} interval
 *
 * @return {Function} throttled function
 */
export function throttle(fn: Function, interval: number): (...args: any[]) => void;

/**
 * Bind function against target <this>.
 *
 * @param  {Function} fn
 * @param  {Object}   target
 *
 * @return {Function} bound function
 */
export function bind<T extends Function>(fn: T, target: object): T;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param source The source object from which to copy properties.
 */
export function assign<T, U>(target: T, source: U): T & U;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param source1 The first source object from which to copy properties.
 * @param source2 The second source object from which to copy properties.
 */
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param source1 The first source object from which to copy properties.
 * @param source2 The second source object from which to copy properties.
 * @param source3 The third source object from which to copy properties.
 */
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param sources One or more source objects from which to copy properties
 */
export function assign(target: object, ...sources: any[]): any;

export function pick<T>(target: T, properties: (keyof T)[]): Pick<T, keyof T>;

/**
 * Pick all target properties, excluding the given ones.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */
export function omit<T>(target: T, properties: (keyof T)[]): Exclude<T, keyof T>;

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 * @param target The target object to copy to.
 * @param sources One or more source objects from which to copy properties
 */
export function merge(target: object, ...sources: any[]): any;

export function isUndefined(obj: any): obj is null | undefined;
export function isDefined(obj: any): obj is Exclude<any, null | undefined>;
export function isNil(obj: any): obj is object;
export function isArray(obj: any): obj is Array<any>;
export function isObject(obj: any): obj is object;
export function isNumber(obj: any): obj is number;
export function isFunction(obj: any): obj is Function;
export function isString(obj: any): obj is string;

/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */
export function ensureArray<T>(obj: Collection<T>): void | never;

/**
 * Return true, if target owns a property with the given key.
 *
 * @param {Object} target
 * @param {String} key
 *
 * @return {Boolean}
 */
export function has(target: any, key: string): boolean;


export type Matcher<T> = ((e: T) => boolean) | ((e: T, idx: number) => boolean) | keyof T;
export type Extractor<T, U=T[keyof T]> = ((e: T) => U) | keyof T;

export type ArrayCollection<T> = Array<T>;
export type StringKeyValueCollection<T> = { [key: string]: T };
export type NumberKeyValueCollection<T> = { [key: number]: T };
export type KeyValueCollection<T> = StringKeyValueCollection<T> | NumberKeyValueCollection<T>;
export type Collection<T> = KeyValueCollection<T> | ArrayCollection<T>;

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function|Object} matcher
 *
 * @return {Object}
 */
export function find<T>(collection: Collection<T>, matcher: Matcher<T>): T | undefined;

/**
 * Find element index in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Object}
 */
export function findIndex<T>(collection: Collection<T>, matcher: Matcher<T>): number | undefined;

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Array} result
 */
export function filter<T>(collection: Collection<T>, matcher: Matcher<T>): T[];

/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param  {Array|Object} collection
 * @param  {Function} iterator
 *
 * @return {Object} return result that stopped the iteration
 */
export function forEach<T>(collection: Collection<T>, iterator: (item: T, convertKey: any /* TODO */) => boolean | void): T;

/**
 * Return collection without element.
 *
 * @param  {Array} arr
 * @param  {Function} matcher
 *
 * @return {Array}
 */
export function without<T>(arr: T[], matcher: Matcher<T>): T[];

/**
 * Reduce collection, returning a single result.
 *
 * @param  {Object|Array} collection
 * @param  {Function} iterator
 * @param  {Any} result
 *
 * @return {Any} result returned from last iterator
 */
export function reduce<T>(collection: Collection<T>, iterator: (...args: any[]) => T, result: T): T;

/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
export function every<T>(collection: Collection<T>, matcher: Matcher<T>): boolean;

/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
export function some<T>(collection: Collection<T>, matcher: Matcher<T>): boolean;

/**
 * Transform a collection into another collection
 * by piping each member through the given fn.
 *
 * @param  {Object|Array}   collection
 * @param  {Function} fn
 *
 * @return {Array} transformed collection
 */
export function map<T, U>(collection: Collection<T>, fn: (value: T, key: number) => U): U[];

/**
 * Get the collections keys.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
export function keys<T>(collection: Collection<T>): T extends Array<any> ? number[] : (keyof T)[];

/**
 * Shorthand for `keys(o).length`.
 *
 * @param  {Object|Array} collection
 *
 * @return {Number}
 */
export function size<T>(collection: Collection<T>): number;

/**
 * Get the values in the collection.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
export function values<T>(collection: Collection<T>): T[];

/**
 * Group collection members by attribute.
 *
 * @param  {Object|Array} collection
 * @param  {Function} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */
export function groupBy<T>(collection: Collection<T>, extractor: Extractor<T>, grouped?: any): { [attrValue: string]: any[] };

export function uniqueBy<T>(extractor: Extractor<T>, ...collections: Collection<T>[]): T[];
export function unionBy<T>(extractor: Extractor<T>, ...collections: Collection<T>[]): T[];

/**
 * Sort collection by criteria.
 *
 * @param  {Object|Array} collection
 * @param  {String|Function} extractor
 *
 * @return {Array}
 */
export function sortBy<T>(collection: Collection<T>, extractor: Extractor<T, number | string>): T[];

/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = matchPattern({ id: 1 });
 *
 * var element = find(elements, matcher);
 *
 * @param  {Object} pattern
 *
 * @return {Function} matcherFn
 */
export function matchPattern<T>(pattern: T): (e: Partial<T>) => boolean;

/**
 * Flatten array, one level deep.
 *
 * @param {Array<?>} arr
 *
 * @return {Array<?>}
 */
export function flatten<T>(arr: T[][]): T[];