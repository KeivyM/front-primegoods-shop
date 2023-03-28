import React from "react";
import Header from "../components/Header";
import { ProductForm } from "../components/ProductForm";

const ProductCreatePage = () => {
  //validacion con el usuario del stado para que solo sea admin
  return (
    <>
      <Header />
      <div>
        <ProductForm />
      </div>
    </>
  );
};

export default ProductCreatePage;
