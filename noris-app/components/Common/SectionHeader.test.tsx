import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  const headerInfo = {
    title: "Pricing",
    subtitle: "Choose the right plan for your needs",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  it("renders the title, subtitle and description", () => {
    render(<SectionHeader headerInfo={headerInfo} />);

    expect(screen.getByText(headerInfo.title)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: headerInfo.subtitle }),
    ).toBeInTheDocument();
    expect(screen.getByText(headerInfo.description)).toBeInTheDocument();
  });
});
