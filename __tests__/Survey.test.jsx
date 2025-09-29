import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import FeedbackForm from "../app/(surveys)/surveys/unique/[id]/page";

jest.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="dot-lottie-mock" />,
}));

jest.mock("../utils/apiFetch.js", () => ({
  apiFetch: jest.fn(),
}));

jest.mock("../stores/alertStore.js", () => ({
  useAlertStore: () => ({
    setMessage: jest.fn(),
    clearMessage: jest.fn(),
    message: null,
  }),
}));

describe("FeedbackForm (Survey)", () => {
  let mockSetMessage;
  let apiFetch;

  beforeEach(() => {
    apiFetch = require("../utils/apiFetch").apiFetch;
    apiFetch.mockReset();
    apiFetch.mockImplementation((url, options) => {
      if (url.includes("/api/surveys/unique/")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              data: {
                survey: {
                  _id: "survey123",
                  title: "Customer Satisfaction",
                  description: "Help us improve!",
                  questions: [
                    {
                      _id: "q1",
                      questionText: "What do you like?",
                      type: "text",
                    },
                    {
                      _id: "q2",
                      questionText: "Choose a feature",
                      type: "choice",
                      options: ["Speed", "Design"],
                    },
                    {
                      _id: "q3",
                      questionText: "Rate us",
                      type: "rating",
                    },
                  ],
                },
              },
            }),
        });
      }
      if (url === "/api/responses") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        });
      }
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Unknown error" }),
      });
    });

    useParams.mockReturnValue({ id: "test-survey-id" });
    useRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
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

  it("shows loading animation initially", async () => {
    render(<FeedbackForm />);
    expect(screen.getByTestId("dot-lottie-mock")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
    });
  });

  it("renders survey title, description, and questions", async () => {
    render(<FeedbackForm />);
    await waitFor(() => {
      expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
      expect(screen.getByText(/Help us improve!/i)).toBeInTheDocument();
      expect(screen.getByText(/What do you like?/i)).toBeInTheDocument();
      expect(screen.getByText(/Choose a feature/i)).toBeInTheDocument();
      expect(screen.getByText(/Rate us/i)).toBeInTheDocument();
    });
  });

  it("fills out and submits the survey", async () => {
    jest
      .spyOn(require("../stores/alertStore.js"), "useAlertStore")
      .mockReturnValue({
        setMessage: mockSetMessage,
        clearMessage: jest.fn(),
        message: "Feedback submitted successfully.",
      });

    render(<FeedbackForm />);
    await waitFor(() => screen.getByText(/Customer Satisfaction/i));

    fireEvent.change(screen.getByPlaceholderText(/Answer 01/i), {
      target: { value: "Fast service" },
    });

    fireEvent.click(screen.getByLabelText("Speed"));

    fireEvent.click(screen.getByLabelText("3"));

    await act(async () => {
      fireEvent.click(screen.getByText(/Submit answer/i));
    });

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        "Feedback submitted successfully."
      );
    });
  });

  it("shows error when no answers are provided", async () => {
    render(<FeedbackForm />);
    await waitFor(() => screen.getByText(/Customer Satisfaction/i));

    await act(async () => {
      fireEvent.click(screen.getByText(/Submit answer/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/No answers provided./i)).toBeInTheDocument();
    });
  });

  it("shows error if API fails", async () => {
    apiFetch.mockImplementation((url) =>
      url === "/api/responses"
        ? Promise.resolve({
            ok: false,
            json: () =>
              Promise.resolve({ message: "Failed to submit feedback." }),
          })
        : Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                data: {
                  survey: {
                    _id: "survey123",
                    title: "Customer Satisfaction",
                    description: "Help us improve!",
                    questions: [
                      {
                        _id: "q1",
                        questionText: "What do you like?",
                        type: "text",
                      },
                    ],
                  },
                },
              }),
          })
    );

    render(<FeedbackForm />);
    await waitFor(() => screen.getByText(/Customer Satisfaction/i));

    fireEvent.change(screen.getByPlaceholderText(/Answer 01/i), {
      target: { value: "Fast service" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Submit answer/i));
    });

    await waitFor(
      () => {
        expect(
          screen.getByText(/Failed to submit feedback./i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("handles network error on survey fetch", async () => {
    apiFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Network error" }),
      })
    );

    render(<FeedbackForm />);
    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Customer Satisfaction/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("dot-lottie-mock")).not.toBeInTheDocument();
    });
  });

  it("handles network error on submit", async () => {
    apiFetch.mockImplementation((url) =>
      url === "/api/surveys/unique/test-survey-id"
        ? Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                data: {
                  survey: {
                    _id: "survey123",
                    title: "Customer Satisfaction",
                    description: "Help us improve!",
                    questions: [
                      {
                        _id: "q1",
                        questionText: "What do you like?",
                        type: "text",
                      },
                    ],
                  },
                },
              }),
          })
        : Promise.reject(new Error("Network error"))
    );

    render(<FeedbackForm />);
    await waitFor(() => screen.getByText(/Customer Satisfaction/i));

    fireEvent.change(screen.getByPlaceholderText(/Answer 01/i), {
      target: { value: "Fast service" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Submit answer/i));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Network error. Please try again./i)
      ).toBeInTheDocument();
    });
  });

  it("handles network error on survey fetch", async () => {
    const apiFetch = require("../utils/apiFetch").apiFetch;
    apiFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Network error" }),
      })
    );

    render(<FeedbackForm />);
    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Customer Satisfaction/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("dot-lottie-mock")).not.toBeInTheDocument();
    });
  });

  it("handles network error on survey fetch", async () => {
    const apiFetch = require("../utils/apiFetch").apiFetch;
    apiFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to load survey" }),
      })
    );

    render(<FeedbackForm />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load survey/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Customer Satisfaction/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("dot-lottie-mock")).not.toBeInTheDocument();
    });
  });

  it("redirects after successful submission", async () => {
    const router = useRouter();
    render(<FeedbackForm />);
    await waitFor(() => screen.getByText(/Customer Satisfaction/i));

    fireEvent.change(screen.getByPlaceholderText(/Answer 01/i), {
      target: { value: "Fast service" },
    });

    fireEvent.click(screen.getByLabelText("Speed"));
    fireEvent.click(screen.getByLabelText("3"));

    await act(async () => {
      fireEvent.click(screen.getByText(/Submit answer/i));
    });

    await waitFor(
      () => {
        expect(mockSetMessage).toHaveBeenCalledWith(
          "Feedback submitted successfully."
        );
        expect(router.replace).toHaveBeenCalledWith("/surveys");
      },
      { timeout: 4000 }
    );
  });
});
