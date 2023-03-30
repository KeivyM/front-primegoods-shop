import { useState, useEffect } from "react";
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
  const [imageId, setImageId] = useState(0);

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

  const handleImageSelected = (value) => {
    console.log("changing image...");
    setImageId(value);
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
        <Card sx={{ border: "1px solid #ccc" }}>
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
              <Grid item>
                <CardMedia
                  component="img"
                  image={product.images[imageId]}
                  alt={product.title}
                  sx={{
                    // maxWidth: "600px",
                    // maxHeight: "600px",
                    width: "600px",
                    height: "500px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Grid>
              <Grid container flexDirection={"row"} gap={1}>
                {product?.images.map((image, i) => {
                  return (
                    <Grid item sx={{ borderRadius: "10px" }}>
                      <img
                        src={image}
                        alt="dhgjgf"
                        width="100px"
                        height="100px"
                        style={{
                          objectFit: "cover",
                          userSelect: "none",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleImageSelected(i)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={4}>
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
