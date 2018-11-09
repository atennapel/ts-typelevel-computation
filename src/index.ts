import { _10, Sqrt } from './Nat';
import { nil, cons } from './Vector';

type Test = Sqrt<_10>; // Test === 3

const vec = cons(1, cons(2, cons(3, nil()))); // length is inferred to be 3
const mapped = vec.map(x => x + 1); // length stays 3

const vecDoubled = vec.append(vec); // length is 6
