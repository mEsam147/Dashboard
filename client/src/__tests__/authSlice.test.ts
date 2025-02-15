// @vitest-environment jsdom
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal("localStorage", localStorageMock);

describe("authSlice", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules(); // Clear module cache before each test
  });

  // Fixed test case
  it("initializes isLogin based on localStorage", async () => {
    // Case 1: auth=true
    localStorage.setItem("auth", "true");
    vi.resetModules(); // Force fresh module load
    const { default: authReducer } = await import("../store/authSlice");
    const initialState = authReducer(undefined, { type: "unknown" });
    expect(initialState.isLogin).toBe(true);

    // Case 2: auth removed
    localStorage.removeItem("auth");
    vi.resetModules(); // Force fresh module load again
    const { default: authReducer2 } = await import("../store/authSlice");
    const initialState2 = authReducer2(undefined, { type: "unknown" });
    expect(initialState2.isLogin).toBe(false); // Now passes ✅
  });
});
