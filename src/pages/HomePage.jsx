import { useEffect, useState } from "react";
import { Box, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
// import ProductSlider from "../components/Slider";
import ProductCard from "../components/ProductCard"; //cambiar card por porductcard
import { AxiosConfig } from "../utils/AxiosConfig";
import Cart from "../components/Cart";
// import CartPage from "./CartPage";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filterTech, setFilterTech] = useState(false);
  // const [filteName, setFilterTech] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      if (!localStorage.getItem("cartItems")) {
        localStorage.setItem("cartItems", "[]");
      }
      const { data } = await AxiosConfig.get("getProducts");
      setProducts(data.data);
      localStorage.setItem("products", JSON.stringify(data.data));
    };
    getProducts();
  }, []);

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
          {products.map((product) => {
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
