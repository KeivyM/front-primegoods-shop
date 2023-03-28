import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/Header";
// import ProductSlider from "../components/Slider";
import ProductCard from "../components/ProductCard"; //cambiar card por porductcard
import { AxiosConfig } from "../utils/AxiosConfig";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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
      <Container style={{ height: "100vh" }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          textAlign="center"
          justifyContent="center"
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
        {/* <ProductSlider /> */}
      </Container>
    </>
  );
};

export default HomePage;
