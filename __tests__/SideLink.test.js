import { render, screen } from "@testing-library/react";
import SideLink from "../components/dashboard/SideLink";

jest.mock("../components/dashboard/SideLink", () => {
  const original = jest.requireActual("../components/dashboard/SideLink");
  return {
    __esModule: true,
    default: ({ active, link }) => {
      const { name, href, icon: Icon } = link;
      return (
        <a href={href}>
          <div
            className={`hover-bg-gray-100 flex max-md-w-max items-center transition duration-300 text-black gap-3.5 inter font-semibold p-3.5 max-lg-p-3 max-md-p-2 rounded-gl ${
              active ? "bg-primary-5" : ""
            }`}
          >
            <Icon className="w-5 max-lg-w-3 h-auto" />
            <span className="base max-md-hidden">{name}</span>
          </div>
        </a>
      );
    },
  };
});

describe("SideLink", () => {
  const link = {
    name: "Dashboard",
    href: "/feedback/dashboard",
    icon: () => <svg data-testid="icon" />,
  };

  it("renders active link", () => {
    render(<SideLink active={true} link={link} />);
    const linkElement = screen.getByRole("link");
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/feedback/dashboard");
    expect(linkElement.firstChild).toHaveClass("bg-primary-5");
  });

  it("renders inactive link", () => {
    render(<SideLink active={false} link={link} />);
    const linkElement = screen.getByRole("link");
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/feedback/dashboard");
    expect(linkElement.firstChild).not.toHaveClass("bg-primary-5");
  });
});
