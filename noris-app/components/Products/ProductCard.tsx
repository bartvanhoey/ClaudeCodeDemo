import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const { image, title, description, price } = product;

  return (
    <div className="rounded-lg border border-stroke bg-white p-4 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection">
      <div className="relative h-40 w-full overflow-hidden rounded-md">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-waterloo dark:text-manatee">
        {description}
      </p>
      <p className="mt-4 font-semibold text-black dark:text-white">
        ${price}
      </p>
    </div>
  );
};

export default ProductCard;
