import { Not } from './Bool';

// natural numbers
export interface Z { tag: 'Z' }
export interface S<N> { tag: 'S'; val: N }

export type Inc<N> = S<N>;
export type Dec<N> = N extends Z ? Z : N extends S<infer M> ? M : never;

// equality and comparison
type Eq$<A, B> =
  A extends Z ? (B extends Z ? { val: true } : { val: false }) :
  A extends S<infer N> ? (B extends S<infer M> ? { val: Eq<N, M> } : { val: false }) :
  never;
export type Eq<A, B> = Eq$<A, B>['val'];

type Leq$<A, B> =
  A extends Z ? { val: true } :
  B extends Z ? { val: false } :
  A extends S<infer N> ?
    (B extends S<infer M> ? { val: Leq<N, M> } : never) :
  never;
export type Leq<A, B> = Leq$<A, B>['val'];

export type Lt<A, B> = Leq<S<A>, B>;
export type Geq<A, B> = Not<Lt<A, B>>;
export type Gt<A, B> = Not<Leq<A, B>>;

type Compare$<A, B> =
  A extends Z ?
    (B extends Z ? { val: 0 } :
      B extends S<infer _> ? { val: -1 } : never) :
  A extends S<infer N> ?
    (B extends Z ? { val: 1 } :
      B extends S<infer M> ? { val: Compare<N, M> } : never) :
  never;
export type Compare<A, B> = Compare$<A, B>['val'];

// max and min
type Max$<A, B> =
  A extends Z ? { val: B } :
  A extends S<infer N> ?
      (B extends Z ? { val: A } :
        B extends S<infer M> ? { val: S<Max<N, M>> }: never) :
  never;
export type Max<A, B> = Max$<A, B>['val'];

type Min$<A, B> =
  A extends Z ? { val: Z } :
  A extends S<infer N> ?
      (B extends Z ? { val: Z } :
        B extends S<infer M> ? { val: S<Min<N, M>> }: never) :
  never;
export type Min<A, B> = Min$<A, B>['val'];

// even and odd
type Even$<N> =
  N extends Z ? { val: true } :
  N extends S<infer M> ?
    (M extends Z ? { val: false} :
      M extends S<infer K> ? { val: Even<K> }:
      { val: never }) :
  never;
export type Even<N> = Even$<N>['val'];

export type Odd<N> = Not<Even<N>>;

// addition and subtraction
type Add$<A, B> =
  A extends Z ? { val: B } :
  A extends S<infer N> ? { val: S<Add<N, B>> } :
  never;
export type Add<A, B> = Add$<A, B>['val'];

type Sub$<A, B> =
  B extends Z ? { val: A } :
  { val: Sub<Dec<A>, Dec<B>> };
export type Sub<A, B> = Sub$<A, B>['val'];

// multiplication, power, division and mod
type Mul$<A, B> =
  A extends Z ? { val: Z } :
  A extends S<infer N> ? { val: Add<B, Mul<N, B>> } :
  never;
export type Mul<A, B> = Mul$<A, B>['val'];

type Pow$<A, B> =
  B extends Z ? { val: S<Z> } :
  B extends S<infer N> ? { val: Mul<A, Pow<A, N>> } :
  never;
export type Pow<A, B> = Pow$<A, B>['val'];

type DivMod$<X, Y, Q, U> =
  X extends Z ? { val: [Q, U] } :
  X extends S<infer N> ?
    (U extends Z ? { val: DivMod<N, Y, S<Q>, Y> } :
      U extends S<infer M> ? { val: DivMod<N, Y, Q, M> } :
      never) :
  never;
export type DivMod<X, Y, Q, U> = DivMod$<X, Y, Q, U>['val'];

export type Div<X, Y> =
  Y extends Z ? Z :
  Y extends S<infer N> ? DivMod<X, N, Z, N>[0] :
  never;

export type Mod<X, Y> =
  Y extends Z ? Z :
  Y extends S<infer N> ? Sub<N, DivMod<X, N, Z, N>[1]> :
  never;

// double, half
export type Double<N> = Mul<N, S<S<Z>>>;
export type Half<N> = Div<N, S<S<Z>>>;

// square and gcd
export type Square<N> = Mul<N, N>;

type GCD$<A, B> =
  A extends Z ? { val: B } :
  A extends S<infer N> ? { val: GCD<Mod<B, A>, A> } :
  never;
export type GCD<A, B> = GCD$<A, B>['val'];

// square root
type SqrtIter$<K, P, Q, R> =
  K extends Z ? { val : P } :
  K extends S<infer K$> ?
    (R extends Z ? { val: SqrtIter<K$, S<P>, S<S<Q>>, S<S<Q>>> } :
      R extends S<infer R$> ? { val: SqrtIter<K$, P, Q, R$> } :
      { val: never }) :
  never;
type SqrtIter<K, P, Q, R> = SqrtIter$<K, P, Q, R>['val'];

export type Sqrt<N> = SqrtIter<N, Z, Z, Z>;

// log2
type Log2Iter$<K, P, Q, R> =
  K extends Z ? { val : P } :
  K extends S<infer K$> ?
    (R extends Z ? { val: Log2Iter<K$, S<P>, S<Q>, Q> } :
      R extends S<infer R$> ? { val: Log2Iter<K$, P, S<Q>, R$> } :
      { val: never }) :
  never;
type Log2Iter<K, P, Q, R> = Log2Iter$<K, P, Q, R>['val'];

export type Log2<N> = Log2Iter<Dec<N>, Z, S<Z>, Z>;

// some numbers
export type _0 = Z;
export type _1 = S<_0>;
export type _2 = S<_1>;
export type _3 = S<_2>;
export type _4 = S<_3>;
export type _5 = S<_4>;
export type _6 = S<_5>;
export type _7 = S<_6>;
export type _8 = S<_7>;
export type _9 = S<_8>;
export type _10 = S<_9>;
