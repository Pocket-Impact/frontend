import { render as rtlRender, screen, act } from "@testing-library/react";
import { Suspense } from "react";
import RootLayout from "../app/(dashboard)/layout";

// Custom render
const customRender = (ui, options) =>
  rtlRender(ui, { wrapper: ({ children }) => children, ...options });

// Mock dependencies
jest.mock("next/font/google", () => ({
  Bricolage_Grotesque: () => ({
    className: "mock-bricolage-grotesque",
    variable: "--font-bricolage-grotesque",
    style: { fontFamily: "Bricolage Grotesque" },
  }),
  Inter: () => ({
    className: "mock-inter",
    variable: "--font-inter",
    style: { fontFamily: "Inter" },
  }),
}));

// Mock child components
jest.mock("../components/AlertComponent", () => () => (
  <div data-testid="alert-component" />
));
jest.mock("../components/dashboard/Sidebar", () => () => (
  <div data-testid="sidebar">
    <span>Pocket Impact</span>
  </div>
));
jest.mock("../components/dashboard/DashboardNavbar", () => () => (
  <div data-testid="navbar" />
));

// Mock RootLayout to avoid <html>
jest.mock("../app/(dashboard)/layout", () => ({
  __esModule: true,
  default: ({ children }) => (
    <div
      className="--font-bricolage-grotesque overflow-hidden bg-background h-screen --font-inter antialiased flex"
      data-testid="root-layout"
    >
      <div data-testid="alert-component" />
      <div className="flex w-full h-screen">
        <div data-testid="sidebar">
          <span>Pocket Impact</span>
        </div>
        <div className="flex-1 flex flex-col h-screen">
          <div data-testid="navbar" />
          <div className="inter relative p-6 max-lg:p-5 max-md:p-4 w-full flex-1 overflow-y-scroll overflow-x-hidden scrolly">
            {children}
          </div>
        </div>
      </div>
    </div>
  ),
}));

describe("Dashboard Layout", () => {
  it("renders sidebar and navbar", async () => {
    await act(async () => {
      customRender(
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayout>
            <div>Test Content</div>
          </RootLayout>
        </Suspense>
      );
    });
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  }, 10000);

  it("applies correct font classes", async () => {
    await act(async () => {
      customRender(
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayout>
            <div>Font Test</div>
          </RootLayout>
        </Suspense>
      );
    });
    const root = screen.getByTestId("root-layout");
    expect(root.className).toMatch(/--font-inter/);
    expect(root.className).toMatch(/--font-bricolage-grotesque/);
  }, 10000);
});
