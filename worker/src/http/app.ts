import { Hono } from "hono";
import { health } from "./routes/health";
import { errorResponse } from "./error";
import { appError, ErrorCode } from "../shared/errors";

export type Env = {
  DB: D1Database;
  MEDIA: R2Bucket;
  ID_CARDS: R2Bucket;
  ENVIRONMENT: string;
};

export const buildApp = () => {
  const app = new Hono<{ Bindings: Env }>();

  app.route("/health", health);

  app.notFound((c) => errorResponse(c, appError(ErrorCode.NOT_FOUND)));

  app.onError((e, c) => {
    console.error("unhandled", e);
    return errorResponse(c, appError(ErrorCode.INTERNAL));
  });

  return app;
};
