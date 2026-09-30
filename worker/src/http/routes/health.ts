import { Hono } from "hono";
import type { Env } from "../app";

export const health = new Hono<{ Bindings: Env }>();

health.get("/", async (c) => {
  // D1 연결까지 확인해야 배포 직후 진짜 동작 여부를 안다
  let db = false;
  try {
    await c.env.DB.prepare("SELECT 1").first();
    db = true;
  } catch {
    db = false;
  }
  return c.json({
    status: db ? "ok" : "degraded",
    environment: c.env.ENVIRONMENT,
    db,
  });
});
