/**
 * Aigle - A fast Promise library with functional programming utilities
 *
 * This is the main entry point for the Aigle library.
 * Aigle is an ideal Promise library that is faster and more functional than other Promise libraries.
 * It provides utility methods for working with collections and async operations.
 *
 * @module aigle
 * @version 1.15.0
 * @author Suguru Motegi
 * @license MIT
 *
 * @example
 * const Aigle = require('aigle');
 *
 * // Create a promise
 * const promise = new Aigle((resolve, reject) => {
 *   resolve('value');
 * });
 *
 * // Use utility methods
 * Aigle.map([1, 2, 3], async (num) => {
 *   return num * 2;
 * }).then(results => {
 *   console.log(results); // [2, 4, 6]
 * });
 */

'use strict';

// It is for browserify https://github.com/suguru03/aigle/issues/56
module.exports = require('./lib/aigle');
