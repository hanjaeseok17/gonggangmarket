import { defineConfig } from "vitest/config";

/**
 * 기본 테스트는 Node에서 돈다.
 *
 * 워커 런타임(workerd)에서 돌리는 설정은 vitest.workers.config.ts에 따로 뒀다.
 * 지금 저장소 경로에 한글이 들어 있어 workerd가 모듈을 찾지 못한다 —
 * 경로를 영문으로 옮기면 `npm run test:workers`가 그대로 동작한다.
 *
 * Hono 앱은 표준 Request/Response만 쓰므로 Node에서도 라우팅과 오류 규약을
 * 그대로 검증할 수 있다. D1·R2를 실제로 만지는 테스트만 워커 런타임이 필요하다.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.test.ts"],
    exclude: ["test/workers/**"],
  },
});
