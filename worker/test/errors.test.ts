import { describe, it, expect } from "vitest";
import { ErrorCode, appError, statusOf } from "../src/shared/errors";

describe("오류 코드", () => {
  it("모든 코드에 HTTP 상태가 지정돼 있다", () => {
    for (const code of Object.values(ErrorCode)) {
      expect(typeof statusOf(code)).toBe("number");
    }
  });

  it("상태 코드는 400~599 범위다", () => {
    for (const code of Object.values(ErrorCode)) {
      const s = statusOf(code);
      expect(s).toBeGreaterThanOrEqual(400);
      expect(s).toBeLessThan(600);
    }
  });

  it("오류에는 사람이 읽는 문장이 들어가지 않는다", () => {
    const e = appError(ErrorCode.OFFER_LIMIT_EXCEEDED, { remainHours: 7 });
    expect(Object.keys(e).sort()).toEqual(["code", "params"]);
    expect(JSON.stringify(e)).not.toMatch(/[가-힣]/);
  });

  it("파라미터가 없으면 params 키를 만들지 않는다", () => {
    expect(appError(ErrorCode.NOT_FOUND)).toEqual({ code: "NOT_FOUND" });
  });
});
