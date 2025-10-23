/**
 * Internal utility types and functions for Aigle library
 *
 * @module aigle/lib/internal
 */

/**
 * Utility constants used throughout the Aigle library
 */
export interface InternalConstants {
  VERSION: string;
  INTERNAL: symbol;
  PENDING: number;
  UNHANDLED: number;
}

/**
 * Error object wrapper
 */
export interface ErrorObject {
  error: any;
}

/**
 * Async queue for managing concurrent operations
 */
export class Queue {
  /**
   * Adds a callback to the queue
   */
  push(callback: () => void): void;

  /**
   * Drains the queue by executing all callbacks
   */
  drain(): void;

  /**
   * Returns the current queue length
   */
  length: number;
}

/**
 * Collection iteration utilities
 */
export namespace Collection {
  /**
   * Sets up the initial collection state
   */
  function setShorthand(collection: any): void;

  /**
   * Gets an iterator for a collection
   */
  function getIterator(collection: any): (value: any, index: number | string, array: any) => any;
}

/**
 * Async execution utilities
 */
export namespace Async {
  /**
   * Invokes a function asynchronously
   */
  function invoke(fn: () => any, callback: (err: Error | null, result?: any) => void): void;
}

/**
 * Mixin utilities for adding methods to classes
 */
export namespace Mixin {
  /**
   * Adds methods from a source object to a target class
   */
  function add(target: any, source: any): void;
}

/**
 * Callback helpers
 */
export namespace Callbacks {
  /**
   * Calls a function with no arguments
   */
  function call0(fn: () => any): any;

  /**
   * Calls a function with resolve callback
   */
  function callResolve(fn: any, value: any): any;

  /**
   * Calls a function with reject callback
   */
  function callReject(fn: any, error: any): any;

  /**
   * Calls a function with receiver context
   */
  function callReceiver(fn: any, receiver: any, value: any): any;
}
