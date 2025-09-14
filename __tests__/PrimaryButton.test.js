import { render, screen } from "@testing-library/react";
import PrimaryButton from "../components/ui/PrimaryButton";

jest.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="dot-lottie-mock" />,
}));

describe("PrimaryButton", () => {
  it("renders button with text and no icon when not loading", () => {
    render(
      <PrimaryButton text="Click me" textStyles="font-bold" type="button" />
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("cursor-pointer");
  });

  it("renders button with icon when provided", () => {
    const icon = <span>Icon</span>;
    render(
      <PrimaryButton
        text="Click me"
        textStyles="font-bold"
        icon={icon}
        type="button"
      />
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders loading state with DotLottieReact", () => {
    render(
      <PrimaryButton
        text="Click me"
        textStyles="font-bold"
        isLoading={true}
        type="button"
      />
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByTestId("dot-lottie-mock")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
  });

  it("is disabled when loading", () => {
    render(
      <PrimaryButton
        text="Click me"
        textStyles="font-bold"
        isLoading={true}
        type="button"
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
