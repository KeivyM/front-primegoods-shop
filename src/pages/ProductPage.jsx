import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardActions, Button, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShoppingCart } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Header, Loader } from "../components";
import { AxiosConfig } from "../utils/AxiosConfig";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart/cartSlice";
import ImageCarousel from "../components/ImageCarousel";
import numeral from "numeral";
import "react-medium-image-zoom/dist/styles.css";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await AxiosConfig.get(`/product/${id}`);
        const images = data.data.images.map((url, id) => ({ url, id }));
        setProduct({ ...data.data, images });
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    getProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    const { _id, title, price, description, images } = product;
    dispatch(addItem({ id: _id, title, price, description, image: images[0].url }));
    navigate("/");
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Container sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>

        <Card sx={{ border: "1px solid #ccc", background: "#f001" }}>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            // spacing={2}
            p={5}
            // sx={{ background: "#ff05" }}
          >
            <Grid
              item
              sx={{
                // height: "50%",
                // maxHeight: "80vh",
                // maxWidth: "50vw",
                // width: "70%",
                overflow: "auto",
                // m: "0 auto",
                // flexDirection: "column",
                // background: "red",
                // display: "flex",
                // flexDirection: { lg: "row" },
              }}
              xs={8}
            >
              <ImageCarousel images={product?.images} />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                // background: "pink",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-around",
              }}
            >
              <CardContent
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <Typography variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="p" color={"#484"} sx={{ fontWeight: 600 }}>
                  {numeral(product.price).format("$0,0.00")}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mt: 5 }}>
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
