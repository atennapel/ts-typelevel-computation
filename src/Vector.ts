import { Z, S, Add } from './Nat';

export default abstract class Vector<L, T> {

  abstract toString(): string;

  abstract map<R>(fn: (val: T) => R): Vector<L, R>;

  abstract append<M>(that: Vector<M, T>): Vector<Add<L, M>, T>;

  abstract toArray(): T[];

}

export class Nil<T> extends Vector<Z, T> {

  toString() {
    return 'Nil';
  }

  map<R>(fn: (val: T) => R): Vector<Z, R> {
    return this as any;
  }

  append<M>(that: Vector<M, T>): Vector<M, T> {
    return that;
  }

  toArray(): T[] {
    return [];
  }

}

export class Cons<L, T> extends Vector<S<L>, T> {

  constructor(
    public readonly head: T,
    public readonly tail: Vector<L, T>,
  ) { super() }

  toString() {
    return `Cons(${this.head}, ${this.tail})`;
  }

  map<R>(fn: (val: T) => R): Vector<S<L>, R> {
    return new Cons(fn(this.head), this.tail.map(fn));
  }

  append<M>(that: Vector<M, T>): Vector<Add<L, M>, T> {
    return new Cons(this.head, this.tail.append(that));
  }

  toArray(): T[] {
    return [this.head].concat(this.tail.toArray());
  }

}

export const nil = <T>(): Vector<Z, T> => new Nil<T>();
export const cons = <L, T>(head: T, tail: Vector<L, T>): Vector<S<L>, T> => new Cons<L, T>(head, tail);
