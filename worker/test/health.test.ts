import { describe, it, expect } from "vitest";
import { buildApp, type Env } from "../src/http/app";

/** D1을 대신하는 가짜. 실패 경로까지 재현한다. */
const fakeDb = (healthy: boolean): D1Database =>
  ({
    prepare: () => ({
      first: async () => {
        if (!healthy) throw new Error("db down");
        return { 1: 1 };
      },
    }),
  }) as unknown as D1Database;

const fakeEnv = (healthy = true): Env =>
  ({
    DB: fakeDb(healthy),
    MEDIA: {} as R2Bucket,
    ID_CARDS: {} as R2Bucket,
    ENVIRONMENT: "test",
  }) as Env;

const app = buildApp();
const call = (path: string, env: Env = fakeEnv()) =>
  app.fetch(new Request(`http://local${path}`), env);

describe("health", () => {
  it("DB가 살아 있으면 ok를 응답한다", async () => {
    const res = await call("/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string; environment: string; db: boolean };
    expect(body.status).toBe("ok");
    expect(body.db).toBe(true);
    expect(body.environment).toBe("test");
  });

  it("DB가 죽어도 응답은 하되 degraded로 알린다", async () => {
    const res = await call("/health", fakeEnv(false));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string; db: boolean };
    expect(body.status).toBe("degraded");
    expect(body.db).toBe(false);
  });
});

describe("오류 규약", () => {
  it("없는 경로는 404와 NOT_FOUND 코드로 답한다", async () => {
    const res = await call("/nope");
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });

  it("오류 응답에 사람이 읽는 문구가 들어가지 않는다", async () => {
    const res = await call("/nope");
    const text = await res.text();
    expect(text).not.toMatch(/[가-힣]/);
  });

  it("오류 본문은 error 키 하나만 갖는다", async () => {
    const res = await call("/nope");
    const body = (await res.json()) as Record<string, unknown>;
    expect(Object.keys(body)).toEqual(["error"]);
  });
});
