import { useEffect, useState } from "react";
import { Box, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
// import ProductSlider from "../components/Slider";
import ProductCard from "../components/ProductCard"; //cambiar card por porductcard
import { AxiosConfig } from "../utils/AxiosConfig";
import Cart from "../components/Cart";
// import axios from "axios";
import SearchInput from "../components/SearchInput";
// import CartPage from "./CartPage";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  // const [filterTech, setFilterTech] = useState(false);
  const [emptyInput, setEmptyInput] = useState(true);
  const [searchByTitle, setSearchByTitle] = useState([]);
  const [searchByPrice, setSearchByPrice] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState([]);
  let datass = [];
  // const [filteName, setFilterTech] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      if (!localStorage.getItem("cartItems")) {
        localStorage.setItem("cartItems", "[]");
      }
      const { data } = await AxiosConfig.get("getProducts");
      setProducts(data.data);
      localStorage.setItem("products", JSON.stringify(data.data));
      // const { data } = await axios.get(
      //   "https://api.escuelajs.co/api/v1/products"
      // );

      // setProducts(data);
      // localStorage.setItem("products", JSON.stringify(data));
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (emptyInput) {
      datass = [];
      setProductsFiltered([]);
    } else {
      datass = [
        ...new Set(searchByPrice.concat(searchByTitle, searchByCategory)),
      ];
      console.log(datass);
      setProductsFiltered(datass);
    }
  }, [searchByTitle, searchByPrice, emptyInput]);

  return (
    <>
      <Header />
      <Grid
        style={{ height: "100vh" }}
        flexDirection="column"
        flexWrap={"wrap"}
        container
        // pt={10}
      >
        <SearchInput
          options={products}
          setSearchByTitle={setSearchByTitle}
          setSearchByPrice={setSearchByPrice}
          setSearchByCategory={setSearchByCategory}
          setEmptyInput={setEmptyInput}
        />
        {/* <Grid item xs={5}> */}
        <Grid
          container
          xs={12}
          md={9}
          spacing={{ xs: 2, sm: 3, md: 4 }}
          textAlign="center"
          justifyContent="center"
          pt={5}
        >
          {emptyInput
            ? products.map((product) => {
                return (
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    md={3}
                    sx={{ alignContent: "center" }}
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
                  // <div
                  //   onClick={() => handleClick(product.id)}
                  //   style={{ cursor: "pointer" }}
                  // >
                  //   <h2>{product.title}</h2>
                  //   <Divider />
                  //   <h3>{product.description}</h3>

                  //   <Chip sx={{ background: "#4495" }} label={product.category} />
                  // </div>
                );
              })
            : productsFiltered.map((product) => {
                return (
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    md={3}
                    sx={{ alignContent: "center" }}
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
              })}
        </Grid>
        {/* </Grid> */}
        {/* <ProductSlider /> */}
        <Divider orientation="vertical" sx={{ height: "100%" }} />
        <Grid
          container
          xs={10}
          md={3}
          sx={{ height: "90%", overflow: "auto" }}
          minHeight={"80vh"}
          pt={5}
          // alignItems="flex-start"
        >
          <Cart />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
