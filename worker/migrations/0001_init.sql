-- S0: 스키마의 뼈대만 세운다. 도메인 테이블은 각 단계에서 추가한다.
-- 설계서 10.2: 모든 주요 테이블에 university_id를 처음부터 둔다.

CREATE TABLE IF NOT EXISTS universities (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email_domain  TEXT NOT NULL UNIQUE,
  semester_start_at INTEGER,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  university_id TEXT NOT NULL REFERENCES universities(id),
  phone_hash    TEXT NOT NULL UNIQUE,
  nickname      TEXT NOT NULL,
  college       TEXT,
  verify_level  INTEGER NOT NULL DEFAULT 0 CHECK(verify_level BETWEEN 0 AND 2),
  trust_score   INTEGER NOT NULL DEFAULT 50,
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK(status IN ('active','suspended','withdrawn')),
  created_at    INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_university ON users(university_id);

-- 멱등성: 돈이 움직이는 요청은 같은 키로 두 번 처리되지 않는다 (NFR-MONEY-02)
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key        TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  scope      TEXT NOT NULL,
  result     TEXT,
  created_at INTEGER NOT NULL
);
