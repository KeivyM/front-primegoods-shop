import React from "react";
import { Header } from "../components";
import { ProductForm } from "../components/ProductForm";

export const ProductCreatePage = () => {
  return (
    <>
      <Header />
      <div>
        <ProductForm />
      </div>
    </>
  );
};
