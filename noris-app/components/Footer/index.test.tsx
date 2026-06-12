import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./index";

describe("Footer", () => {
  it("renders the Noris copyright with the current year", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Noris. All rights reserved`),
    ).toBeInTheDocument();
  });

  it("renders the quick links section", () => {
    render(<Footer />);

    expect(
      screen.getByRole("heading", { name: "Quick Links" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
  });

  it("renders both logo variants for light and dark mode", () => {
    render(<Footer />);

    const logos = screen.getAllByAltText("Logo");
    expect(logos).toHaveLength(2);
  });
});
