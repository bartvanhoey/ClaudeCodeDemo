import { Product } from "@/types/product";

const productsData: Product[] = [
  {
    id: 1,
    image: "/images/product/product-01.svg",
    title: "Noris Starter Kit",
    description: "Everything you need to launch your first project.",
    price: 49,
  },
  {
    id: 2,
    image: "/images/product/product-02.svg",
    title: "Noris Pro Bundle",
    description: "Advanced tools and components for growing teams.",
    price: 99,
  },
  {
    id: 3,
    image: "/images/product/product-03.svg",
    title: "Noris Analytics Suite",
    description: "Track performance with real-time dashboards.",
    price: 79,
  },
  {
    id: 4,
    image: "/images/product/product-04.svg",
    title: "Noris Design System",
    description: "A complete library of reusable UI components.",
    price: 59,
  },
  {
    id: 5,
    image: "/images/product/product-05.svg",
    title: "Noris Enterprise",
    description: "Custom solutions and dedicated support for enterprises.",
    price: 199,
  },
];

export default productsData;
