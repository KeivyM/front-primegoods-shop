import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShoppingCart } from "@mui/icons-material";
import { Header, Loader } from "../components";
import { AxiosConfig } from "../utils/AxiosConfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart/cartSlice";

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

export const ProductPage = () => {
  const dispatch = useDispatch();
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
  }, [id, navigate]);

  const handleAddToCart = () => {
    const { _id, title, price, description, images } = product;
    dispatch(addItem({ id: _id, title, price, description, image: images[0] }));
    navigate("/");
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Container>
        <IconButton>
          <ArrowBackIcon onClick={() => navigate("/")} />
        </IconButton>
        <Card>
          <Grid container direction="row" spacing={2}>
            <Grid
              item
              sx={{
                height: "50%",
                maxHeight: "80vh",
                maxWidth: "50vw",
                width: "70%",
                overflow: "auto",
              }}
              xs={8}
            >
              <CardMedia
                component="img"
                image={product.images[0]}
                alt={product.title}
                // height={"50%"}
                // width={"50%"}
              />
            </Grid>
            <Grid
              item
              xs={4}
              // p=
              // sx={{
              //   padding: 2,
              //   boxSizing: "conte-box",
              // width: "auto",
              // bgcolor: "#333",
              // }}
            >
              <CardContent sx={{ position: "relative" }}>
                <Typography variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="p">
                  {product.price}
                </Typography>
                <Chip
                  label={product.category}
                  sx={{ position: "absolute", top: "10px", right: "10px" }}
                />
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  startIcon={<ShoppingCart />}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
