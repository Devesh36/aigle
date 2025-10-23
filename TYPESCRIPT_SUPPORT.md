# TypeScript Support in Aigle

This document describes the TypeScript support and type definitions available in the Aigle library.

## Quick Start

### Installation

```bash
npm install aigle
# or
yarn add aigle
```

### Basic Usage with TypeScript

```typescript
import Aigle from 'aigle';

// Create a promise
const promise = new Aigle<string>((resolve, reject) => {
  resolve('Hello, World!');
});

// Use promise methods
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Type Definitions

### Main Types

#### `Aigle<R>`

The main promise class, generic over the resolved value type `R`.

```typescript
// Create an Aigle promise that resolves to a number
const promise: Aigle<number> = new Aigle((resolve) => {
  resolve(42);
});
```

#### `Aigle.ReturnType<T>`

Specifies what an iterator can return - either a value of type `T` or a promise-like.

```typescript
type MyReturn = Aigle.ReturnType<string>;
// Equivalent to: string | PromiseLike<string>
```

#### `Aigle.AllSettledResponse<T>`

Represents the response from `allSettled()` - either fulfilled or rejected.

```typescript
type Response = Aigle.AllSettledResponse<number>;
// Equivalent to:
// { status: 'fulfilled'; value: number } |
// { status: 'rejected'; reason: Error }
```

### Iterator Types

#### `ArrayIterator<T, R>`

Function signature for iterating over arrays.

```typescript
type Handler = Aigle.ArrayIterator<number, string>;
// (element: number, index: number, array: number[]) => string | PromiseLike<string>
```

#### `ObjectIterator<T, R>`

Function signature for iterating over objects.

```typescript
interface User {
  name: string;
  age: number;
}

type Handler = Aigle.ObjectIterator<User, boolean>;
// <K extends keyof User>(element: User[K], key: K, object: User) => boolean | PromiseLike<boolean>
```

#### `MemoArrayIterator<T, R>`

Function signature for reduce-like operations.

```typescript
type Handler = Aigle.MemoArrayIterator<number, number>;
// (accumulator: number, element: number, index: number, array: number[]) => number | PromiseLike<number>
```

## Method Examples

### Collection Operations

#### `map(collection, iterator)`

Maps over elements in parallel.

```typescript
const numbers = [1, 2, 3];
const result: Aigle<number[]> = Aigle.map(numbers, (num) => {
  return num * 2;
});
```

#### `filter(collection, iterator)`

Filters elements in parallel.

```typescript
const numbers = [1, 2, 3, 4, 5];
const result: Aigle<number[]> = Aigle.filter(numbers, (num) => {
  return num > 2;
});
```

#### `reduce(collection, iterator, initialValue)`

Reduces collection to a single value.

```typescript
const numbers = [1, 2, 3];
const result: Aigle<number> = Aigle.reduce(numbers, (acc, num) => acc + num, 0);
```

#### `find(collection, iterator)`

Finds first matching element.

```typescript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const result: Aigle<{ id: number; name: string } | undefined> = Aigle.find(users, (user) => {
  return user.id === 2;
});
```

### Series vs Parallel vs Limit

All operations have three variants:

- **Parallel** (default): `map()`, `filter()`, `each()`, etc. - executes concurrently
- **Series**: `mapSeries()`, `filterSeries()`, `eachSeries()`, etc. - executes sequentially
- **Limit**: `mapLimit()`, `filterLimit()`, `eachLimit()`, etc. - executes with concurrency limit

```typescript
const numbers = [1, 2, 3, 4, 5];

// Parallel (concurrent)
const parallel = Aigle.map(numbers, async (n) => n * 2);

// Series (sequential)
const series = Aigle.mapSeries(numbers, async (n) => n * 2);

// Limit (max 2 concurrent)
const limited = Aigle.mapLimit(numbers, 2, async (n) => n * 2);
```

### Promise Utilities

#### `all(promises)`

Waits for all promises to resolve.

```typescript
const promise1 = Aigle.resolve(1);
const promise2 = Aigle.resolve(2);

const result: Aigle<(number | undefined)[]> = Aigle.all([promise1, promise2]);
```

#### `allSettled(promises)`

Waits for all promises to settle (resolve or reject).

```typescript
const promises = [Aigle.resolve(1), Aigle.reject(new Error('Failed'))];

const result: Aigle<Aigle.AllSettledResponse<number>[]> = Aigle.allSettled(promises);
```

#### `race(promises)`

Returns first settled promise.

```typescript
const promise1 = Aigle.delay(100).then(() => 1);
const promise2 = Aigle.delay(50).then(() => 2);

const result: Aigle<number> = Aigle.race([promise1, promise2]);
// result resolves to 2
```

#### `delay(ms)`

Delays execution.

```typescript
const result: Aigle<void> = Aigle.delay(1000);
// Resolves after 1 second
```

## Configuration

### TypeScript Config

A `tsconfig.json` is provided at the root. You can extend it:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}
```

### Strict Mode

For the best type safety, enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

## Common Patterns

### Chaining Operations

```typescript
Aigle.resolve([1, 2, 3])
  .map((num) => num * 2)
  .filter((num) => num > 2)
  .then((results) => {
    console.log(results); // [4, 6]
  });
```

### Error Handling

```typescript
Aigle.map([1, 2, 3], async (num) => {
  if (num === 2) {
    throw new Error('Error at 2');
  }
  return num * 2;
})
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Working with Objects

```typescript
const user = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
};

const result: Aigle<Record<keyof typeof user, string>> = Aigle.mapValues(user, (value) => {
  return String(value);
});
```

## Troubleshooting

### Type Errors

If you see type errors, ensure:

1. TypeScript version is 3.8 or higher
2. You're importing from the correct module
3. Type parameters match the operation

### Missing Types

If some methods don't have types:

1. Check the `index.d.ts` file
2. Verify you're using the latest version
3. Check for open issues on GitHub

## Building Type Definitions

The type definitions are built from `typings/aigle-base.d.ts` using the `typeg` tool:

```bash
npm run build:type
```

This generates the final `typings/aigle.d.ts` file.

## Contributing

To improve TypeScript support:

1. Edit `index.d.ts` for main declarations
2. Edit `typings/aigle-base.d.ts` for the base types
3. Run `npm run build:type` to regenerate types
4. Test with `npm run test:type`

## Resources

- [Aigle GitHub Repository](https://github.com/suguru03/aigle)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Promise Specification](https://promisesaplus.com/)
