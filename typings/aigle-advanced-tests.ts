/**
 * Comprehensive TypeScript Tests for Aigle
 * This file demonstrates various TypeScript usage patterns with Aigle
 */

import Aigle from '../index';

// ============================================
// Test 1: Basic Promise Creation and Chaining
// ============================================

const basicPromise: Aigle<number> = new Aigle((resolve) => {
  resolve(42);
});

const chainedPromise: Aigle<string> = basicPromise
  .then((num) => num.toString())
  .then((str) => `Value: ${str}`);

// ============================================
// Test 2: Collection Operations - Map
// ============================================

const numbers: number[] = [1, 2, 3, 4, 5];
const doubled: Aigle<number[]> = Aigle.map(numbers, (n) => n * 2);
const mappedWithIndex: Aigle<number[]> = Aigle.map(numbers, (n, index) => n + index);

// Map with async function
const asyncMapped: Aigle<string[]> = Aigle.map(numbers, async (n) => {
  await Aigle.delay(10);
  return `Value: ${n}`;
});

// ============================================
// Test 3: Collection Operations - Filter
// ============================================

const filtered: Aigle<number[]> = Aigle.filter(numbers, (n) => n > 2);
const asyncFiltered: Aigle<number[]> = Aigle.filter(numbers, async (n) => {
  await Aigle.delay(5);
  return n % 2 === 0;
});

// ============================================
// Test 4: Collection Operations - Reduce
// ============================================

const sum: Aigle<number> = Aigle.reduce(numbers, (acc, n) => acc + n, 0);
const product: Aigle<number> = Aigle.reduce(numbers, (acc, n) => acc * n, 1);

// ============================================
// Test 5: Collection Operations - Find
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

const foundUser: Aigle<User | undefined> = Aigle.find(users, (user) => user.id === 2);

// ============================================
// Test 6: Promise Utilities - All
// ============================================

const promise1: Aigle<number> = Aigle.resolve(1);
const promiseArray: Aigle<number[]> = Aigle.all([promise1, promise1, promise1]);

// ============================================
// Test 7: Promise Utilities - Race
// ============================================

const fast: Aigle<string> = Aigle.delay(10).then(() => 'fast');
const slow: Aigle<string> = Aigle.delay(100).then(() => 'slow');

const raceResult: Aigle<string> = Aigle.race([fast, slow]);

// ============================================
// Test 8: Error Handling
// ============================================

const withErrorHandling: Aigle<string> = Aigle.map([1, 2, 3], (n) => n * 2)
  .then((arr) => arr.join(','))
  .catch(() => 'error occurred');

// ============================================
// Test 9: Limit Operations
// ============================================

const mapLimitResults: Aigle<number[]> = Aigle.mapLimit(numbers, 2, (n) => n * 2);
const filterLimitResults: Aigle<number[]> = Aigle.filterLimit(numbers, 3, (n) => n > 2);

// ============================================
// Test 10: Series Operations
// ============================================

const mapSeriesResults: Aigle<number[]> = Aigle.mapSeries(numbers, async (n) => {
  await Aigle.delay(10);
  return n * 2;
});

const filterSeriesResults: Aigle<number[]> = Aigle.filterSeries(numbers, async (n) => {
  await Aigle.delay(5);
  return n % 2 === 0;
});

// ============================================
// Test 11: Delay
// ============================================

const delayedValue: Aigle<number> = Aigle.delay(100).then(() => 42);

// ============================================
// Test 12: Reject
// ============================================

const rejected: Aigle<never> = Aigle.reject(new Error('Test error'));

// ============================================
// Test 15: Complex Chaining
// ============================================

const complexChain: Aigle<string> = Aigle.resolve([1, 2, 3, 4, 5])
  .then((arr) => Aigle.map(arr, (n) => n * 2))
  .then((arr) => arr.join(','))
  .catch(() => 'default');

// ============================================
// Test 16: Finally
// ============================================

const withCleanup: Aigle<number> = Aigle.resolve(42).finally(() => {
  console.log('Cleanup called');
});

// ============================================
// Test 17: Return Value Resolution
// ============================================

const resolved: Aigle<number> = Aigle.resolve(100);
const fromThen: Aigle<string> = resolved.then((n) => `Number: ${n}`);

// ============================================
// Summary of Type Checks
// ============================================

// Type-safe: All operations maintain proper types
export const typeTests = {
  basicPromise,
  chainedPromise,
  doubled,
  asyncMapped,
  filtered,
  asyncFiltered,
  sum,
  product,
  foundUser,
  promiseArray,
  raceResult,
  withErrorHandling,
  mapLimitResults,
  filterLimitResults,
  mapSeriesResults,
  filterSeriesResults,
  delayedValue,
  rejected,
  complexChain,
  withCleanup,
  resolved,
  fromThen,
};
