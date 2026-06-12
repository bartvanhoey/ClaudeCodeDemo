import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import Products from "./index";
import productsData from "./productsData";
import messages from "@/messages/en.json";

const renderWithIntl = (ui: React.ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );

describe("Products", () => {
  it("renders the page heading and Create Product button", () => {
    renderWithIntl(<Products />);

    expect(
      screen.getByRole("heading", { name: "Products" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Product" }),
    ).toBeInTheDocument();
  });

  it("renders a card for each product", () => {
    renderWithIntl(<Products />);

    productsData.forEach((product) => {
      const item =
        messages.ProductsPage.items[
          String(product.id) as keyof typeof messages.ProductsPage.items
        ];
      expect(
        screen.getByRole("heading", { name: item.title }),
      ).toBeInTheDocument();
    });

    expect(screen.getAllByRole("img")).toHaveLength(productsData.length);
  });
});
