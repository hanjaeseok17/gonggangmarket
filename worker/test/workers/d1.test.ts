import { env } from "cloudflare:test";
import { describe, it, expect } from "vitest";

/** 실제 D1 바인딩이 살아 있는지만 확인한다. 스키마 검증은 각 단계에서 추가한다. */
describe("D1 바인딩", () => {
  it("쿼리가 실행된다", async () => {
    const row = await env.DB.prepare("SELECT 1 AS one").first<{ one: number }>();
    expect(row?.one).toBe(1);
  });
});
