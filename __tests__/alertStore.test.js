import { act } from "@testing-library/react";
import { useAlertStore } from "../stores/alertStore";

describe("alertStore", () => {
  it("sets and clears message", () => {
    act(() => {
      useAlertStore.getState().setMessage("Test message");
    });
    expect(useAlertStore.getState().message).toBe("Test message");
    act(() => {
      useAlertStore.getState().clearMessage();
    });
    expect(useAlertStore.getState().message).toBe(null);
  });
});
