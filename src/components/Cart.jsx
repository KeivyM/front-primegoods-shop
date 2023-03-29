import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeItem } from "../store/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Grid container sx={{ width: "90%", justifyContent: "space-between" }}>
        <Typography variant="h4" margin={"0 auto"} display={"inline"}>
          Your order
        </Typography>
        <Chip label={"Total: $" + total.toFixed(2)} sx={{ bgcolor: "#fffe" }} />
      </Grid>
      <List sx={{ width: "100%" }}>
        {items.map((producto, i) => (
          <Box key={producto.id + "-" + i}>
            {i === 0 && <Divider sx={{ bgcolor: "text.main" }} />}
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={producto.title} src={producto.image} />
              </ListItemAvatar>
              <ListItemText
                primary={producto.title}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                    >
                      {`Price: $${producto.price.toFixed(2)}`}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span" color="white">
                      {`Description: ${producto.description}`}
                    </Typography>
                  </>
                }
              />
              <IconButton
                onClick={() => dispatch(removeItem(i))}
                title="Remove item"
                color="text"
              >
                <CloseIcon />
              </IconButton>
            </ListItem>
            <Divider sx={{ bgcolor: "text.main" }} />
          </Box>
        ))}
      </List>
    </>
  );
};

export default Cart;
