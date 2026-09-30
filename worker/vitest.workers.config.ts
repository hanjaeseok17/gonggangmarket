import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

/**
 * 실제 workerd에서 도는 통합 테스트.
 * D1·R2·Durable Object를 진짜로 만지는 테스트만 여기에 둔다.
 *
 * 주의: 저장소 경로에 한글이 있으면 workerd가 모듈을 찾지 못한다.
 * 영문 경로에서 `npm run test:workers`로 실행한다.
 */
export default defineWorkersConfig({
  test: {
    globals: true,
    include: ["test/workers/**/*.test.ts"],
    poolOptions: {
      workers: { wrangler: { configPath: "./wrangler.jsonc" } },
    },
  },
});
