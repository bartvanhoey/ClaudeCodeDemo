import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Products from "./index";
import productsData from "./productsData";

describe("Products", () => {
  it("renders the page heading and Create Product button", () => {
    render(<Products />);

    expect(
      screen.getByRole("heading", { name: "Products" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Product" }),
    ).toBeInTheDocument();
  });

  it("renders a card for each product", () => {
    render(<Products />);

    productsData.forEach((product) => {
      expect(
        screen.getByRole("heading", { name: product.title }),
      ).toBeInTheDocument();
    });

    expect(screen.getAllByRole("img")).toHaveLength(productsData.length);
  });
});
