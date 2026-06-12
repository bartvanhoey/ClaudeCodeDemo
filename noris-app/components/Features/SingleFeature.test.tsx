import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SingleFeature from "./SingleFeature";
import { Feature } from "@/types/feature";

describe("SingleFeature", () => {
  const feature: Feature = {
    id: 1,
    icon: "/images/icon/icon-01.svg",
    title: "Real-Time Analytics",
    description: "Track your performance with live, actionable insights.",
  };

  it("renders the feature title, description and icon", () => {
    render(<SingleFeature feature={feature} />);

    expect(
      screen.getByRole("heading", { name: feature.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(feature.description)).toBeInTheDocument();

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("alt", "title");
  });
});
