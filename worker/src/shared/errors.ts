/**
 * 서버는 문구를 모른다 (설계서 RULE 4 · ADR-4).
 * 오류는 코드와 파라미터로만 표현하고, 번역은 클라이언트가 한다.
 * PRD 11장 오류 규약과 1:1 대응한다.
 */
export const ErrorCode = {
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  VERIFY_REQUIRED: "VERIFY_REQUIRED",
  SANCTIONED: "SANCTIONED",
  BANK_REQUIRED: "BANK_REQUIRED",
  ITEM_ALREADY_SOLD: "ITEM_ALREADY_SOLD",
  ESCROW_EXISTS: "ESCROW_EXISTS",
  ALREADY_CONFIRMED: "ALREADY_CONFIRMED",
  OFFER_LIMIT_EXCEEDED: "OFFER_LIMIT_EXCEEDED",
  BANNED_KEYWORD: "BANNED_KEYWORD",
  LIMIT_EXCEEDED: "LIMIT_EXCEEDED",
  RATE_LIMITED: "RATE_LIMITED",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  INVALID_INPUT: "INVALID_INPUT",
  INTERNAL: "INTERNAL",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type AppError = {
  readonly code: ErrorCode;
  /** 클라이언트가 문구를 조립할 때 쓰는 값. 문장이 아니라 값만 담는다. */
  readonly params?: Readonly<Record<string, string | number>>;
};

export const appError = (
  code: ErrorCode,
  params?: Readonly<Record<string, string | number>>,
): AppError => (params === undefined ? { code } : { code, params });

/** 오류 코드 하나당 HTTP 상태 하나. 라우터가 판단하지 않게 한다. */
const STATUS: Readonly<Record<ErrorCode, number>> = {
  TOKEN_EXPIRED: 401,
  VERIFY_REQUIRED: 403,
  SANCTIONED: 403,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BANK_REQUIRED: 400,
  INVALID_INPUT: 400,
  ITEM_ALREADY_SOLD: 409,
  ESCROW_EXISTS: 409,
  ALREADY_CONFIRMED: 409,
  OFFER_LIMIT_EXCEEDED: 422,
  BANNED_KEYWORD: 422,
  LIMIT_EXCEEDED: 422,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

export const statusOf = (code: ErrorCode): number => STATUS[code];
