/**
 * 예외 대신 값으로 실패를 다룬다. 도메인은 예외를 던지지 않는다.
 * 설계서 RULE 1 — 도메인은 바깥(프레임워크의 예외 체계)을 모른다.
 */
export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err<E> = { readonly ok: false; readonly error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E>(error: E): Err<E> => ({ ok: false, error });

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.ok;
export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => !r.ok;

/** 성공값을 옮긴다. 실패면 그대로 흘려보낸다. */
export const map = <T, U, E>(r: Result<T, E>, f: (v: T) => U): Result<U, E> =>
  r.ok ? ok(f(r.value)) : r;

/** 성공이면 다음 단계로 이어 붙인다. */
export const flatMap = <T, U, E>(
  r: Result<T, E>,
  f: (v: T) => Result<U, E>,
): Result<U, E> => (r.ok ? f(r.value) : r);

/** 실패를 기본값으로 대체한다. */
export const orElse = <T, E>(r: Result<T, E>, fallback: T): T =>
  r.ok ? r.value : fallback;
