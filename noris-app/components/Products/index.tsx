import React from "react";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import productsData from "./productsData";

const Products = () => {
  const t = useTranslations("ProductsPage");

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black dark:text-white xl:text-hero">
            {t("title")}
          </h1>
          <button className="rounded-full bg-primary px-6 py-2 font-medium text-white duration-300 ease-in-out hover:bg-primaryho">
            {t("createProduct")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
