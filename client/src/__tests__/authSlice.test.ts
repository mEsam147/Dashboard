import { vi, describe, it, expect, beforeEach } from "vitest";

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
    vi.resetModules(); 
  });

  
  it("initializes isLogin based on localStorage", async () => {
    localStorage.setItem("auth", "true");
    vi.resetModules(); 
    const { default: authReducer } = await import("../store/authSlice");
    const initialState = authReducer(undefined, { type: "unknown" });
    expect(initialState.isLogin).toBe(true);

    localStorage.removeItem("auth");
    vi.resetModules(); 
    const { default: authReducer2 } = await import("../store/authSlice");
    const initialState2 = authReducer2(undefined, { type: "unknown" });
    expect(initialState2.isLogin).toBe(false); 
  });
});
