import { ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../store/cart/cartSlice";

const ProductCard = ({ image, price, title, description, id }) => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`product/${productId}`);
  };

  const handleAddToCart = () => {
    dispatch(addItem({ id, title, price, quantity: 1 }));
    console.log(items);
  };
  // useEffect(() => {
  //   if (!localStorage.getItem("cartItems")) {
  //     console.log("no existe");
  //   }
  // }, []);

  return (
    <Card xs={{ border: "1px solid red" }}>
      <CardActionArea onClick={() => handleClick(id)}>
        <CardMedia
          component="img"
          height="140"
          width="200"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        startIcon={<ShoppingCart />}
        size="small"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
