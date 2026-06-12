import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import messages from "@/messages/en.json";

describe("ProductCard", () => {
  const product: Product = {
    id: 1,
    image: "/images/product/product-01.svg",
    price: 49,
  };

  const renderWithIntl = () =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ProductCard product={product} />
      </NextIntlClientProvider>,
    );

  it("renders the product title, description and price", () => {
    renderWithIntl();

    const item = messages.ProductsPage.items["1"];
    expect(
      screen.getByRole("heading", { name: item.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
  });

  it("renders the product image", () => {
    renderWithIntl();

    const item = messages.ProductsPage.items["1"];
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", item.title);
  });
});
