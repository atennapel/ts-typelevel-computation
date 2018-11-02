export type Not<B> =
  B extends true ? false :
  B extends false ? true :
  never;

export type And<A, B> =
  A extends false ? false :
  A extends true ? B :
  never;

export type Or<A, B> =
  A extends true ? true :
  A extends false ? B :
  never;

export type If<C, A, B> =
  C extends true ? A :
  C extends false ? B :
  never;
