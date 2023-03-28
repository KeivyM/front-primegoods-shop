import React from "react";
import { ProductForm } from "../components/ProductForm";

const ProductCreatePage = () => {
  //validacion con el usuario del stado para que solo sea admin
  return (
    <div>
      ProductCreatePage
      <ProductForm />
    </div>
  );
};

export default ProductCreatePage;
