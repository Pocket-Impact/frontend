import { apiFetch } from "../utils/apiFetch";

describe("apiFetch", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = global.fetch;
    fetchMock.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("makes a successful request", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: "success" }),
    });

    const response = await apiFetch("/api/test", { method: "GET" });
    expect(fetchMock).toHaveBeenCalledWith("/api/test", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toEqual({ data: "success" });
  });

  it("retries on 401 and succeeds", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: "success" }),
      });

    const response = await apiFetch("/api/test", { method: "GET" });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/test", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/test", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toEqual({ data: "success" });
  });

  it("retries on 401 and fails again", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: () => Promise.resolve({ error: "Forbidden" }),
      });

    const response = await apiFetch("/api/test", { method: "GET" });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/test", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/test", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(false);
    expect(await response.json()).toEqual({ error: "Forbidden" });
  });

  it("handles network error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    await expect(apiFetch("/api/test")).rejects.toThrow("Network error");
    expect(fetchMock).toHaveBeenCalledWith("/api/test", {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  });
});
