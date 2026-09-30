import { buildApp } from "./http/app";
import type { Env } from "./http/app";

const app = buildApp();

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
    app.fetch(req, env, ctx),
} satisfies ExportedHandler<Env>;
