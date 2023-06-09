import { ShoppingCart } from "@mui/icons-material";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../store/cart/cartSlice";
import numeral from "numeral";
import CustomButton from "./Button";

export const ProductCard = ({ image, price, title, description, id, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`product/${productId}`);
  };

  const handleAddToCart = () => {
    dispatch(addItem({ id, title, price, description, image }));
  };

  return (
    <Card sx={{ border: "1px solid #0005", p: 2 }}>
      <CardActionArea onClick={() => handleClick(id)}>
        <CardMedia component="img" height="200" width="200" image={image} alt={title} />
        <CardContent>
          <Chip label={category} sx={{ position: "relative" }} />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {title}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600 }} color="text.secondary">
            {numeral(price).format("$0,0.00")}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CustomButton text="add to cart" onClick={handleAddToCart} startIcon={<ShoppingCart />} size="small" />
    </Card>
  );
};
