'use strict';

const { AigleProxy } = require('aigle-core');

const Aigle = require('./aigle');
const {
  INTERNAL,
  PENDING,
  iteratorSymbol,
  promiseArrayEach,
  promiseSetEach,
} = require('./internal/util');
const { callResolve } = require('./props');

/**
 * All class - Waits for all promises in a collection to resolve
 * @class
 * @extends AigleProxy
 * @private
 */
class All extends AigleProxy {
  /**
   * Creates an All instance
   * @param {Array|Set} coll - Collection of promises
   */
  constructor(coll) {
    super();
    this._promise = new Aigle(INTERNAL);
    this._rest = undefined;
    this._result = undefined;
    if (coll === PENDING) {
      this._callResolve = this._set;
    } else {
      this._callResolve = undefined;
      this._set(coll);
    }
  }

  /**
   * Sets up the collection for iteration
   * @private
   * @param {Array|Set} coll - Collection of promises
   * @returns {All} Returns this for chaining
   */
  _set(coll) {
    if (Array.isArray(coll)) {
      const size = coll.length;
      this._rest = size;
      this._result = Array(size);
      this._callResolve = callResolve;
      promiseArrayEach(this, size, coll);
    } else if (coll[iteratorSymbol]) {
      const { size } = coll;
      this._rest = size;
      this._result = Array(size);
      this._callResolve = callResolve;
      promiseSetEach(this, Infinity, coll);
    } else {
      this._rest = 0;
      this._result = [];
    }
    if (this._rest === 0) {
      this._promise._resolve(this._result);
    }
    return this;
  }

  /**
   * Executes the All operation
   * @private
   * @returns {Aigle} The result promise
   */
  _execute() {
    return this._promise;
  }

  /**
   * Handles rejection
   * @private
   * @param {Error} reason - Rejection reason
   */
  _callReject(reason) {
    this._promise._reject(reason);
  }
}

module.exports = { all, All };

/**
 * `Aigle.all` is almost the same functionality as `Promise.all`.
 * It will return an Aigle instance.
 * @param {Array} array
 * @return {Aigle} Returns an Aigle instance
 * @example
 * const order = [];
 * const makeDelay = (num, delay) => {
 *   return Aigle.delay(delay)
 *     .then(() => {
 *       order.push(num);
 *       return num;
 *     });
 * };
 * Aigle.all([
 *   makeDelay(1, 30),
 *   makeDelay(2, 20),
 *   makeDelay(3, 10)
 * ])
 * .then(array => {
 *   console.log(array); // [1, 2, 3];
 *   console.log(order); // [3, 2, 1];
 * });
 */
function all(array) {
  return new All(array)._promise;
}
