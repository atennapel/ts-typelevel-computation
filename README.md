# ts-typelevel-computation

```typescript
// perform computations on the type level
// includes:
// Boolean: not, and, or, if
// Nat: +, -, *, /, %, sqrt, log2, gcd and comparisons
// Vector: mapping and appending

type Test = Sqrt<_10>; // Test === 3

const vec = cons(1, cons(2, cons(3, nil()))); // length is inferred to be 3
const mapped = vec.map(x => x + 1); // length stays 3

const vecDoubled = vec.append(vec); // length is 6
```
