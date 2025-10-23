/**
 * Aigle - A fast Promise library with functional programming utilities
 *
 * This file provides the TypeScript type definitions for the Aigle library.
 * Aigle is an ideal Promise library that is faster and more functional than other Promise libraries.
 *
 * @module aigle
 * @version 1.15.0
 */

export default Aigle;
export { Aigle };

/**
 * Aigle Promise Class
 *
 * Aigle is a Promise-like class that extends JavaScript's native Promise functionality
 * with utility methods for working with collections and async operations.
 *
 * @template R The type of the resolved value
 * @class
 * @implements {PromiseLike<R>}
 */
declare class Aigle<R> implements PromiseLike<R> {
  /**
   * Creates a new Aigle promise instance
   *
   * @param executor A function that takes resolve and reject callbacks, and optionally an onCancel callback
   * @param executor.resolve Function to resolve the promise with a value
   * @param executor.reject Function to reject the promise with an error
   * @param executor.onCancel Optional function to handle cancellation
   *
   * @example
   * const promise = new Aigle((resolve, reject) => {
   *   resolve('value');
   * });
   */
  constructor(
    executor: (
      resolve: (thenableOrResult?: R | PromiseLike<R>) => void,
      reject: (error?: any) => void,
      onCancel?: (callback: () => void) => void
    ) => void
  );

  /**
   * Gets the constructor that should be used for derived promises
   */
  static get [Symbol.species](): typeof Aigle;

  /**
   * Adds handlers to be called when the promise is settled
   *
   * @template T The type of the resolved value returned by onFulfill
   * @param onFulfill Callback function when the promise is fulfilled
   * @param onReject Callback function when the promise is rejected
   * @returns A new Aigle promise
   */
  then<T>(
    onFulfill?: (value: R) => Aigle.ReturnType<T>,
    onReject?: (error: any) => Aigle.ReturnType<T>
  ): Aigle<T>;

  then<TResult1 = R, TResult2 = never>(
    onfulfilled?: ((value: R) => Aigle.ReturnType<TResult1>) | null,
    onrejected?: ((reason: any) => Aigle.ReturnType<TResult2>) | null
  ): Aigle<TResult1 | TResult2>;

  /**
   * Adds a handler to be called when the promise is rejected
   * Supports optional error filtering
   *
   * @param onReject Callback function to handle the error
   * @returns A new Aigle promise with the same type as the original
   */
  catch(onReject: (error: any) => Aigle.ReturnType<R>): Aigle<R>;

  /**
   * Adds a finally handler that is called regardless of promise settlement
   *
   * @template T The type of the value returned by the handler
   * @param handler Callback function to execute
   * @returns A new Aigle promise
   */
  finally<T>(handler: () => Aigle.ReturnType<T>): Aigle<R>;

  /**
   * Resolves when all promises in the array/tuple are resolved
   *
   * @param this An Aigle instance containing an array of promises
   * @returns A new Aigle promise that resolves to an array of results
   */
  all<T>(this: Aigle<(T | PromiseLike<T>)[]>): Aigle<T[]>;

  /**
   * Waits for all promises to settle and returns their results
   *
   * @param this An Aigle instance containing an array of promise-likes
   * @returns A new Aigle promise that resolves to an array of settlement responses
   */
  allSettled<T>(
    this: Aigle<(T | PromiseLike<T> | Aigle.PromiseCallback<T>)[]>
  ): Aigle<Aigle.AllSettledResponse<T>[]>;

  /**
   * Resolves when any promise in the array/tuple is resolved or rejected
   *
   * @param this An Aigle instance containing an array of promises
   * @returns A new Aigle promise that resolves/rejects with the first settled promise's result
   */
  race<T>(this: Aigle<(T | PromiseLike<T>)[]>): Aigle<T>;

  /**
   * Resolves properties in a map or object
   *
   * @param this An Aigle instance containing a resolvable object or map
   * @returns A new Aigle promise with resolved properties
   */
  props<K, V>(this: Aigle<Map<K, PromiseLike<V> | V>>): Aigle<Map<K, V>>;
  props<T>(this: Aigle<Aigle.ResolvableProps<T>>): Aigle<T>;

  /**
   * Executes promises in series (sequentially)
   *
   * @param this An Aigle instance containing an array of promise-likes
   * @returns A new Aigle promise that resolves to an array of results
   */
  series<T>(this: Aigle<(T | PromiseLike<T> | Aigle.PromiseCallback<T>)[]>): Aigle<T[]>;

  /**
   * Executes promises in parallel
   *
   * @param this An Aigle instance containing an array of promise-likes
   * @returns A new Aigle promise that resolves to an array of results
   */
  parallel<T>(this: Aigle<(T | PromiseLike<T> | Aigle.PromiseCallback<T>)[]>): Aigle<T[]>;

  /**
   * Executes promises in parallel with a concurrency limit
   *
   * @param this An Aigle instance containing an array of promise-likes
   * @param limit Maximum number of concurrent promises (optional)
   * @returns A new Aigle promise that resolves to an array of results
   */
  parallelLimit<T>(
    this: Aigle<(T | PromiseLike<T> | Aigle.PromiseCallback<T>)[]>,
    limit?: number
  ): Aigle<T[]>;

  /**
   * Iterates over each element and executes an iterator (parallel)
   *
   * @param this An Aigle instance containing a collection
   * @param iterator Function to execute for each element
   * @returns A new Aigle promise that resolves to the original collection
   */
  each<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  each<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, any>): Aigle<Aigle.List<T>>;
  each<T extends object>(this: Aigle<T>, iterator?: Aigle.ObjectIterator<T, any>): Aigle<T>;

  /**
   * Alias for each()
   */
  forEach<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  forEach<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  forEach<T extends object>(this: Aigle<T>, iterator?: Aigle.ObjectIterator<T, any>): Aigle<T>;

  /**
   * Iterates over each element in series (sequentially)
   *
   * @param this An Aigle instance containing a collection
   * @param iterator Function to execute for each element
   * @returns A new Aigle promise that resolves to the original collection
   */
  eachSeries<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  eachSeries<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  eachSeries<T extends object>(this: Aigle<T>, iterator?: Aigle.ObjectIterator<T, any>): Aigle<T>;

  /**
   * Alias for eachSeries()
   */
  forEachSeries<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  forEachSeries<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  forEachSeries<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, any>
  ): Aigle<T>;

  /**
   * Iterates over each element with a concurrency limit
   *
   * @param this An Aigle instance containing a collection
   * @param iterator Optional iterator function
   * @param limit Optional concurrency limit
   * @returns A new Aigle promise that resolves to the original collection
   */
  eachLimit<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  eachLimit<T>(this: Aigle<T[]>, limit: number, iterator: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  eachLimit<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  eachLimit<T>(
    this: Aigle<Aigle.List<T>>,
    limit: number,
    iterator: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  eachLimit<T extends object>(this: Aigle<T>, iterator?: Aigle.ObjectIterator<T, any>): Aigle<T>;
  eachLimit<T extends object>(
    this: Aigle<T>,
    limit: number,
    iterator: Aigle.ObjectIterator<T, any>
  ): Aigle<T>;

  /**
   * Alias for eachLimit()
   */
  forEachLimit<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, any>): Aigle<T[]>;
  forEachLimit<T>(
    this: Aigle<T[]>,
    limit: number,
    iterator: Aigle.ArrayIterator<T, any>
  ): Aigle<T[]>;
  forEachLimit<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  forEachLimit<T>(
    this: Aigle<Aigle.List<T>>,
    limit: number,
    iterator: Aigle.ListIterator<T, any>
  ): Aigle<Aigle.List<T>>;
  forEachLimit<T extends object>(this: Aigle<T>, iterator?: Aigle.ObjectIterator<T, any>): Aigle<T>;
  forEachLimit<T extends object>(
    this: Aigle<T>,
    limit: number,
    iterator: Aigle.ObjectIterator<T, any>
  ): Aigle<T>;

  /**
   * Maps each element in a collection (parallel)
   *
   * @param this An Aigle instance containing a collection
   * @param iterator Function that transforms each element
   * @returns A new Aigle promise that resolves to an array of transformed elements
   */
  map<T, R>(this: Aigle<T[]>, iterator: Aigle.ArrayIterator<T, R>): Aigle<R[]>;
  map<T, R>(this: Aigle<Aigle.List<T>>, iterator: Aigle.ListIterator<T, R>): Aigle<R[]>;
  map<T extends object, R>(this: Aigle<T>, iterator: Aigle.ObjectIterator<T, R>): Aigle<R[]>;

  /**
   * Maps each element in series (sequentially)
   */
  mapSeries<T, R>(this: Aigle<T[]>, iterator: Aigle.ArrayIterator<T, R>): Aigle<R[]>;
  mapSeries<T, R>(this: Aigle<Aigle.List<T>>, iterator: Aigle.ListIterator<T, R>): Aigle<R[]>;
  mapSeries<T extends object, R>(this: Aigle<T>, iterator: Aigle.ObjectIterator<T, R>): Aigle<R[]>;

  /**
   * Maps each element with a concurrency limit
   */
  mapLimit<T, R>(this: Aigle<T[]>, iterator: Aigle.ArrayIterator<T, R>): Aigle<R[]>;
  mapLimit<T, R>(this: Aigle<T[]>, limit: number, iterator: Aigle.ArrayIterator<T, R>): Aigle<R[]>;
  mapLimit<T, R>(this: Aigle<Aigle.List<T>>, iterator: Aigle.ListIterator<T, R>): Aigle<R[]>;
  mapLimit<T, R>(
    this: Aigle<Aigle.List<T>>,
    limit: number,
    iterator: Aigle.ListIterator<T, R>
  ): Aigle<R[]>;
  mapLimit<T extends object, R>(this: Aigle<T>, iterator: Aigle.ObjectIterator<T, R>): Aigle<R[]>;
  mapLimit<T extends object, R>(
    this: Aigle<T>,
    limit: number,
    iterator: Aigle.ObjectIterator<T, R>
  ): Aigle<R[]>;

  /**
   * Filters elements in a collection
   */
  filter<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  filter<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T[]>;
  filter<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Filters elements in series (sequentially)
   */
  filterSeries<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  filterSeries<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, boolean>
  ): Aigle<T[]>;
  filterSeries<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Filters elements with a concurrency limit
   */
  filterLimit<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  filterLimit<T>(
    this: Aigle<T[]>,
    limit: number,
    iterator: Aigle.ArrayIterator<T, boolean>
  ): Aigle<T[]>;
  filterLimit<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T[]>;
  filterLimit<T>(
    this: Aigle<Aigle.List<T>>,
    limit: number,
    iterator: Aigle.ListIterator<T, boolean>
  ): Aigle<T[]>;
  filterLimit<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;
  filterLimit<T extends object>(
    this: Aigle<T>,
    limit: number,
    iterator: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Rejects elements in a collection
   */
  reject<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  reject<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T[]>;
  reject<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Rejects elements in series (sequentially)
   */
  rejectSeries<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  rejectSeries<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, boolean>
  ): Aigle<T[]>;
  rejectSeries<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Rejects elements with a concurrency limit
   */
  rejectLimit<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T[]>;
  rejectLimit<T>(
    this: Aigle<T[]>,
    limit: number,
    iterator: Aigle.ArrayIterator<T, boolean>
  ): Aigle<T[]>;
  rejectLimit<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T[]>;
  rejectLimit<T>(
    this: Aigle<Aigle.List<T>>,
    limit: number,
    iterator: Aigle.ListIterator<T, boolean>
  ): Aigle<T[]>;
  rejectLimit<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;
  rejectLimit<T extends object>(
    this: Aigle<T>,
    limit: number,
    iterator: Aigle.ObjectIterator<T, boolean>
  ): Aigle<Array<T[keyof T]>>;

  /**
   * Checks if all elements satisfy a predicate
   */
  every<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<boolean>;
  every<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<boolean>;
  every<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<boolean>;

  /**
   * Checks if at least one element satisfies a predicate
   */
  some<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<boolean>;
  some<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<boolean>;
  some<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<boolean>;

  /**
   * Finds the first element that satisfies a predicate
   */
  find<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T>;
  find<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T>;
  find<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<T[keyof T]>;

  /**
   * Alias for find()
   */
  detect<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<T>;
  detect<T>(this: Aigle<Aigle.List<T>>, iterator?: Aigle.ListIterator<T, boolean>): Aigle<T>;
  detect<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<T[keyof T]>;

  /**
   * Finds the index of the first element that satisfies a predicate
   */
  findIndex<T>(this: Aigle<T[]>, iterator?: Aigle.ArrayIterator<T, boolean>): Aigle<number>;
  findIndex<T>(
    this: Aigle<Aigle.List<T>>,
    iterator?: Aigle.ListIterator<T, boolean>
  ): Aigle<number>;
  findIndex<T extends object>(
    this: Aigle<T>,
    iterator?: Aigle.ObjectIterator<T, boolean>
  ): Aigle<number>;

  /**
   * Reduces collection to a single value
   */
  reduce<T, R>(
    this: Aigle<T[]>,
    iterator: Aigle.MemoArrayIterator<T, R>,
    initialValue?: R
  ): Aigle<R>;
  reduce<T, R>(
    this: Aigle<Aigle.List<T>>,
    iterator: Aigle.MemoListIterator<T, R>,
    initialValue?: R
  ): Aigle<R>;
  reduce<T extends object, R>(
    this: Aigle<T>,
    iterator: Aigle.MemoObjectIterator<T, R>,
    initialValue?: R
  ): Aigle<R>;

  /**
   * Transforms collection into an accumulator
   */
  transform<T, R>(
    this: Aigle<T[]>,
    iterator: Aigle.MemoArrayIterator<T, R[]>,
    accumulator?: R[]
  ): Aigle<R[]>;
  transform<T, R>(
    this: Aigle<T[]>,
    iterator: Aigle.MemoArrayIterator<T, Aigle.Dictionary<R>>,
    accumulator: Aigle.Dictionary<R>
  ): Aigle<Aigle.Dictionary<R>>;
}

namespace Aigle {
  /**
   * Specifies the return type that can be returned from iterator functions
   *
   * @template T The type of the return value
   */
  type ReturnType<T> = T | PromiseLike<T>;

  /**
   * A callback that can be used as a promise value
   *
   * @template T The type that will be resolved
   */
  type PromiseCallback<T> = () => T | PromiseLike<T>;

  /**
   * A catch filter to catch specific error types
   *
   * @template E The error type to filter
   */
  type CatchFilter<E> = (error: any) => error is E | (new (...args: any[]) => E);

  /**
   * Response from allSettled
   *
   * @template T The type of the resolved value
   */
  type AllSettledResponse<T> =
    | { status: 'fulfilled'; value: T }
    | { status: 'rejected'; reason: Error };

  /**
   * Array iterator function type
   *
   * @template T The element type
   * @template R The return value type
   */
  type ArrayIterator<T, R> = (element: T, index: number, array: T[]) => R | PromiseLike<R>;

  /**
   * List iterator function type (for array-like objects)
   *
   * @template T The element type
   * @template R The return value type
   */
  type ListIterator<T, R> = (element: T, index: number, list: List<T>) => R | PromiseLike<R>;

  /**
   * Object iterator function type
   *
   * @template T The object type
   * @template R The return value type
   */
  type ObjectIterator<T, R> = <K extends keyof T>(
    element: T[K],
    key: K,
    object: T
  ) => R | PromiseLike<R>;

  /**
   * Memo iterator function type for reduction operations
   *
   * @template T The element type
   * @template R The accumulator type
   */
  type MemoArrayIterator<T, R> = (
    accumulator: R,
    element: T,
    index: number,
    array: T[]
  ) => R | PromiseLike<R>;

  /**
   * Memo list iterator function type
   *
   * @template T The element type
   * @template R The accumulator type
   */
  type MemoListIterator<T, R> = (
    accumulator: R,
    element: T,
    index: number,
    list: List<T>
  ) => R | PromiseLike<R>;

  /**
   * Memo object iterator function type
   *
   * @template T The object type
   * @template R The accumulator type
   */
  type MemoObjectIterator<T, R> = <K extends keyof T>(
    accumulator: R,
    element: T[K],
    key: K,
    object: T
  ) => R | PromiseLike<R>;

  /**
   * Dictionary/map type
   *
   * @template T The value type
   */
  type Dictionary<T> = { [key: string]: T };

  /**
   * List type (array-like objects)
   *
   * @template T The element type
   */
  type List<T> = ArrayLike<T>;

  /**
   * Resolvable properties type
   *
   * @template T The object type
   */
  type ResolvableProps<T> = {
    [K in keyof T]: T[K] | PromiseLike<T[K]>;
  };
}

/**
 * Static methods on the Aigle class
 */
namespace Aigle {
  /**
   * Creates an Aigle promise that resolves immediately with the given value
   *
   * @template T The type of the value
   * @param value The value to resolve
   * @returns An Aigle promise that resolves to the value
   */
  function resolve<T>(value: T | PromiseLike<T>): Aigle<T>;

  /**
   * Creates an Aigle promise that rejects immediately with the given error
   *
   * @template T The type of the resolved value (for type checking)
   * @param reason The error to reject with
   * @returns An Aigle promise that rejects with the error
   */
  function reject<T>(reason: any): Aigle<T>;

  /**
   * Creates an Aigle promise that resolves when all input promises resolve
   *
   * @template T The type of array elements
   * @param values Array of values or promises
   * @returns An Aigle promise that resolves to an array of results
   */
  function all<T>(values: (T | PromiseLike<T>)[]): Aigle<T[]>;

  /**
   * Creates an Aigle promise that waits for all input promises to settle
   *
   * @template T The type of array elements
   * @param values Array of values or promises
   * @returns An Aigle promise that resolves to an array of settlement responses
   */
  function allSettled<T>(values: (T | PromiseLike<T>)[]): Aigle<AllSettledResponse<T>[]>;

  /**
   * Creates an Aigle promise that resolves when any input promise settles
   *
   * @template T The type of array elements
   * @param values Array of values or promises
   * @returns An Aigle promise that settles with the first settled promise's result
   */
  function race<T>(values: (T | PromiseLike<T>)[]): Aigle<T>;

  /**
   * Delays execution by the given number of milliseconds
   *
   * @param ms Number of milliseconds to delay
   * @returns An Aigle promise that resolves after the delay
   */
  function delay(ms: number): Aigle<void>;

  /**
   * Creates a mapping of the collection elements
   *
   * @template T The element type
   * @template R The mapped value type
   * @param collection The collection to map
   * @param iterator The mapping function
   * @returns An Aigle promise that resolves to an array of mapped values
   */
  function map<T, R>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator: ArrayIterator<T, R> | ListIterator<T, R> | ObjectIterator<any, R>
  ): Aigle<R[]>;

  /**
   * Creates a mapping in series (sequentially)
   */
  function mapSeries<T, R>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator: ArrayIterator<T, R> | ListIterator<T, R> | ObjectIterator<any, R>
  ): Aigle<R[]>;

  /**
   * Creates a mapping with concurrency limit
   */
  function mapLimit<T, R>(
    collection: T[] | List<T> | Dictionary<T>,
    limit: number,
    iterator: ArrayIterator<T, R> | ListIterator<T, R> | ObjectIterator<any, R>
  ): Aigle<R[]>;

  /**
   * Filters collection elements
   */
  function filter<T>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator?: ArrayIterator<T, boolean> | ListIterator<T, boolean> | ObjectIterator<any, boolean>
  ): Aigle<T[]>;

  /**
   * Filters collection elements in series (sequentially)
   */
  function filterSeries<T>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator?: ArrayIterator<T, boolean> | ListIterator<T, boolean> | ObjectIterator<any, boolean>
  ): Aigle<T[]>;

  /**
   * Filters collection elements with concurrency limit
   */
  function filterLimit<T>(
    collection: T[] | List<T> | Dictionary<T>,
    limit: number,
    iterator: ArrayIterator<T, boolean> | ListIterator<T, boolean> | ObjectIterator<any, boolean>
  ): Aigle<T[]>;

  /**
   * Reduces collection to a single value
   */
  function reduce<T, R>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator: MemoArrayIterator<T, R> | MemoListIterator<T, R> | MemoObjectIterator<any, R>,
    initialValue?: R
  ): Aigle<R>;

  /**
   * Finds first element matching predicate
   */
  function find<T>(
    collection: T[] | List<T> | Dictionary<T>,
    iterator?: ArrayIterator<T, boolean> | ListIterator<T, boolean> | ObjectIterator<any, boolean>
  ): Aigle<T | undefined>;

  /**
   * Returns the value as-is in an Aigle promise
   *
   * @template T The value type
   * @param value The value to wrap
   * @returns An Aigle promise that resolves to the value
   */
  function promisify<T>(value: T | PromiseLike<T>): Aigle<T>;
}

export namespace Aigle {}
