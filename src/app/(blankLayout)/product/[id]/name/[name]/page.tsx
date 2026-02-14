import ProductDetails from "@/components/ProductDetails";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
    name: string;
  }>;
};

async function ProductDetailsPage({ params }: Props) {
  const { id, name } = await params;

  return <ProductDetails id={id} name={name} />;
}

export default ProductDetailsPage;
