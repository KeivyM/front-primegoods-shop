import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { AxiosConfig } from "../utils/AxiosConfig";
import { ProductCard, SearchInput, Header } from "../components";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [emptyInput, setEmptyInput] = useState(true);
  const [searchByTitle, setSearchByTitle] = useState([]);
  const [searchByPrice, setSearchByPrice] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      if (!localStorage.getItem("cartItems")) {
        localStorage.setItem("cartItems", "[]");
      }
      const { data } = await AxiosConfig.get("getProducts");
      setProducts(data.data);
      localStorage.setItem("products", JSON.stringify(data.data));
      //------prueba con api gratuita--------//
      // const { data } = await axios.get(
      //   "https://api.escuelajs.co/api/v1/products"
      // );

      // setProducts(data);
      // localStorage.setItem("products", JSON.stringify(data));
    };
    getProducts();
  }, []);

  useEffect(() => {
    let arrayProducts = [];
    if (emptyInput) {
      arrayProducts = [];
      setProductsFiltered([]);
    } else {
      arrayProducts = [...new Set(searchByPrice.concat(searchByTitle, searchByCategory))];
      setProductsFiltered(arrayProducts);
    }
  }, [searchByTitle, searchByPrice, searchByCategory, emptyInput]);

  return (
    <>
      <Header />
      <Grid
        flexDirection="column"
        flexWrap={"wrap"}
        sx={{ p: "5px 20px 20px 20px", margin: "0 auto" }}
        maxWidth={"1500px"}
        container
      >
        <SearchInput
          options={products}
          setSearchByTitle={setSearchByTitle}
          setSearchByPrice={setSearchByPrice}
          setSearchByCategory={setSearchByCategory}
          setEmptyInput={setEmptyInput}
        />
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} textAlign="center" justifyContent="center" pt={5}>
          {emptyInput
            ? products.map((product) => {
                return (
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    md={4}
                    lg={3}
                    sx={{ alignContent: "center", maxWidth: "300px", minWidth: "250px" }}
                    key={product._id}
                  >
                    <ProductCard
                      image={product.images[0]}
                      price={product.price}
                      title={product.title}
                      description={product.description}
                      id={product._id}
                      category={product.category}
                    />
                  </Grid>
                );
              })
            : productsFiltered.map((product) => {
                return (
                  <Grid item xs={10} sm={5} md={3} sx={{ alignContent: "center" }} key={product._id}>
                    <ProductCard
                      image={product.images[0]}
                      price={product.price}
                      title={product.title}
                      description={product.description}
                      id={product._id}
                      category={product.category}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </>
  );
};
