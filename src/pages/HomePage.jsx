import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import Header from "../components/Header";
// import ProductSlider from "../components/Slider";
import ProductCard from "../components/Card"; //cambiar card por porductcard
import { AxiosConfig } from "../utils/AxiosConfig";

const data = [
  {
    id: 1,
    title: "Title",
    description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
    price: 5.0,
    category: "tech",
  },
  {
    id: 2,
    title: "Title",
    description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
    price: 5.0,
    category: "tech",
  },
  {
    id: 3,
    title: "Title",
    description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
    price: 5.0,
    category: "tech",
  },
  {
    id: 4,
    title: "Title",
    description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
    price: 5.0,
    category: "tech",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await AxiosConfig.get("getProducts");
      setProducts(data.data);
    };
    getProducts();
  }, []);

  const handleClick = (productId) => {
    navigate(`product/${productId}`);
  };

  return (
    <>
      <Header />
      <Container style={{ height: "100vh" }}>
        <Grid container spacing={2} textAlign="center" justifyContent="center">
          {products.map((product) => {
            return (
              <Grid
                item
                xs={10}
                sm={2}
                sx={{ alignContent: "center" }}
                onClick={() => handleClick(product._id)}
                key={product._id}
              >
                <ProductCard
                  image={product.images[0]}
                  price="$10.99"
                  title="Product Title"
                  description="This is a description of the product."
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
