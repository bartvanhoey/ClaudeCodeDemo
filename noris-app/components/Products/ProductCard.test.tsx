import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

describe("ProductCard", () => {
  const product: Product = {
    id: 1,
    image: "/images/product/product-01.svg",
    title: "Noris Starter Kit",
    description: "Everything you need to get started.",
    price: 49,
  };

  it("renders the product title, description and price", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: product.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
  });

  it("renders the product image", () => {
    render(<ProductCard product={product} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", product.title);
  });
});
