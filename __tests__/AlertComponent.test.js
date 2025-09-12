import { render, screen } from "@testing-library/react";
import AlertComponent from "../components/AlertComponent";
import { useAlertStore } from "../stores/alertStore";

jest.mock("../stores/alertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("AlertComponent", () => {
  it("renders with message", () => {
    useAlertStore.mockReturnValue({ message: "Success!" });
    render(<AlertComponent />);
    expect(screen.getByText(/Success!/i)).toBeInTheDocument();
    expect(screen.getByTestId("alert-component")).toHaveClass("translate-y-0");
  });

  it("renders without message", () => {
    useAlertStore.mockReturnValue({ message: null });
    render(<AlertComponent />);
    expect(screen.queryByText(/Success!/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("alert-component")).toHaveClass(
      "-translate-y-15"
    );
  });
});
