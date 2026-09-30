import type { Context } from "hono";
import { statusOf, type AppError } from "../shared/errors";

/**
 * 도메인 오류를 HTTP 응답으로 옮기는 유일한 자리.
 * 라우터마다 상태 코드를 적지 않는다.
 */
export const errorResponse = (c: Context, e: AppError, traceId?: string) =>
  c.json(
    {
      error: {
        code: e.code,
        ...(e.params ? { params: e.params } : {}),
        ...(traceId ? { traceId } : {}),
      },
    },
    statusOf(e.code) as 200,
  );
