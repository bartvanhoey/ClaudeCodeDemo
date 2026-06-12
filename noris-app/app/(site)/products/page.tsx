import Products from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Page - Noris SaaS Boilerplate",
  description: "This is the Products page for Noris Pro",
};

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;
