import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShoppingCart } from "@mui/icons-material";
import Header from "../components/Header";
import { AxiosConfig } from "../utils/AxiosConfig";

// const data = [
//   {
//     title: "Title",
//     description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
//     price: 5.0,
//     category: "tech",
//   },
//   {
//     title: "Title",
//     description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
//     price: 5.0,
//     category: "tech",
//   },
//   {
//     title: "Title",
//     description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
//     price: 5.0,
//     category: "tech",
//   },
//   {
//     title: "Title",
//     description: "adkjfd fef dfjhd djhg fjhfd jfdjgh dsjfhd jhs jdfhg fgf ",
//     price: 5.0,
//     category: "tech",
//   },
// ];

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await AxiosConfig.get(`/product/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    getProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <CardMedia
            component="img"
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6" component="p">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<ShoppingCart />}
              size="large"
              variant="contained"
              color="primary"
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default ProductPage;
