import { randomBytes } from "crypto";
import type { IncomingHttpHeaders } from "http2";
import { getAPIKey } from "src/api/auth";
import { describe, expect, test } from "vitest";

describe("Test getAPI key", () => {
  const validKey = randomBytes(32).toString("hex");

  test("valid key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${validKey}`
    }

    const key = getAPIKey(headers)

    expect(key).toEqual(validKey);
  })

  test("invalid key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: `BEARER ${validKey}`
    }

    const key = getAPIKey(headers)

    expect(key).toEqual(null);
  })

  test("invalid header", () => {
    const headers: IncomingHttpHeaders = {}
    const key = getAPIKey(headers)

    expect(key).toEqual(null);
  })
})
