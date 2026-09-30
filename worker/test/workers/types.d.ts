/// <reference path="../../node_modules/@cloudflare/vitest-pool-workers/types/cloudflare-test.d.ts" />

import type { Env } from "../../src/http/app";

declare module "cloudflare:test" {
  // 테스트에서 쓰는 env가 실제 워커 바인딩과 같은 타입임을 알린다
  interface ProvidedEnv extends Env {}
}
