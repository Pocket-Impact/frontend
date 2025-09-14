import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import Page from "../app/(feedbacks)/feedbacks/[id]/page";

jest.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="dot-lottie-mock" />,
}));

jest.mock("../utils/apiFetch.js", () => ({
  apiFetch: jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  ),
}));

jest.mock("../stores/alertStore.js", () => ({
  useAlertStore: () => ({
    setMessage: jest.fn(),
    clearMessage: jest.fn(),
    message: null,
  }),
}));

describe("Feedback Submission", () => {
  let mockSetMessage;

  beforeEach(() => {
    useParams.mockReturnValue({ id: "test-feedback-id" });
    mockSetMessage = jest.fn();
    jest
      .spyOn(require("../stores/alertStore.js"), "useAlertStore")
      .mockReturnValue({
        setMessage: mockSetMessage,
        clearMessage: jest.fn(),
        message: null,
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders feedback form", async () => {
    render(<Page />);
    expect(screen.getByText(/Feedback Form/i)).toBeInTheDocument();
    expect(
      screen.getByText("Category", { selector: "label" })
    ).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<Page />);
    fireEvent.click(screen.getByText(/Submit answer/i));
    await waitFor(() => {
      expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
    });
  });

  it("submits feedback and shows success", async () => {
    jest
      .spyOn(require("../stores/alertStore.js"), "useAlertStore")
      .mockReturnValue({
        setMessage: mockSetMessage,
        clearMessage: jest.fn(),
        message: "Feedback submitted successfully!",
      });

    render(<Page />);
    fireEvent.click(screen.getByText(/Select category/i));
    fireEvent.click(screen.getByText(/product/i));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Great product!" },
    });
    fireEvent.click(screen.getByText(/Submit answer/i));

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        "Feedback submitted successfully!"
      );
    });
  });

  it("shows error on API failure", async () => {
    const apiFetch = require("../utils/apiFetch").apiFetch;
    apiFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({ status: "fail", message: "Server error" }),
      })
    );

    render(<Page />);
    fireEvent.click(screen.getByText(/Select category/i));
    fireEvent.click(screen.getByText(/product/i));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Great product!" },
    });
    fireEvent.click(screen.getByText(/Submit answer/i));

    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });

  it("shows error when message is empty", async () => {
    render(<Page />);
    fireEvent.click(screen.getByText(/Select category/i));
    fireEvent.click(screen.getByText(/product/i));
    fireEvent.click(screen.getByText(/Submit answer/i));
    await waitFor(() => {
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  

  it("handles network error", async () => {
    const apiFetch = require("../utils/apiFetch").apiFetch;
    apiFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<Page />);
    fireEvent.click(screen.getByText(/Select category/i));
    fireEvent.click(screen.getByText(/product/i));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Great product!" },
    });
    fireEvent.click(screen.getByText(/Submit answer/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Server error. Please try again later./i)
      ).toBeInTheDocument();
    });
  });

  it("toggles category dropdown", async () => {
    render(<Page />);
    fireEvent.click(screen.getByTestId("caret-down-icon"));
    await waitFor(() => {
      expect(screen.getByText(/product/i)).toBeInTheDocument();
    });
  });
});
