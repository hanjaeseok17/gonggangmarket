import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, map, flatMap, orElse } from "../src/shared/result";

describe("Result", () => {
  it("성공은 값을 담는다", () => {
    const r = ok(3);
    expect(isOk(r)).toBe(true);
    expect(r.ok && r.value).toBe(3);
  });

  it("실패는 오류를 담는다", () => {
    const r = err("nope");
    expect(isErr(r)).toBe(true);
    expect(!r.ok && r.error).toBe("nope");
  });

  it("map은 성공값만 바꾼다", () => {
    expect(map(ok(2), (v) => v * 5)).toEqual(ok(10));
  });

  it("map은 실패를 그대로 흘려보낸다", () => {
    const e = err("bad");
    expect(map(e, (v: number) => v * 5)).toBe(e);
  });

  it("flatMap은 실패를 만나면 멈춘다", () => {
    let called = false;
    const r = flatMap(err("stop"), () => {
      called = true;
      return ok(1);
    });
    expect(called).toBe(false);
    expect(isErr(r)).toBe(true);
  });

  it("orElse는 실패일 때 기본값을 준다", () => {
    expect(orElse(err("x"), 7)).toBe(7);
    expect(orElse(ok(1), 7)).toBe(1);
  });
});
