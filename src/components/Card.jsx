import { ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";

const ProductCard = ({ image, price, title, description }) => {
  return (
    <Card>
      <CardActionArea>
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
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
