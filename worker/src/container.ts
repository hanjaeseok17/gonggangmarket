import type { Env } from "./http/app";

/**
 * 수동 의존성 조립 (설계서 8.3).
 * 요청마다 env가 달라지므로 요청 시점에 만든다.
 * S1 이후 유스케이스가 생기면 여기에 추가한다.
 */
export type Container = {
  readonly now: () => Date;
  readonly newId: () => string;
};

export const buildContainer = (
  _env: Env,
  now: () => Date = () => new Date(),
  newId: () => string = () => crypto.randomUUID(),
): Container => ({ now, newId });
