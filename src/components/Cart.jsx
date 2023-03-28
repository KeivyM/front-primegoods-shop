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
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { removeItem, updateItemQuantity } from "../store/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce((acc, item) => acc + item.price, 0);
  console.log(total);

  return (
    // <div style={{ height: "90vh" }}>
    <>
      <Grid container sx={{ width: "90%", justifyContent: "space-between" }}>
        <Typography variant="h5" margin={"0 auto"} display={"inline"}>
          Your order
        </Typography>
        <Chip label={"$" + total.toFixed(2)} sx={{ bgcolor: "#555a6177" }} />
      </Grid>
      <List sx={{ width: "100%" }}>
        {items.map((producto, i) => (
          <>
            <ListItem key={producto.id}>
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
                      color="text.primary"
                    >
                      {`Precio: $${producto.price.toFixed(2)}`}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                      {`Descripción: ${producto.description}`}
                    </Typography>
                  </>
                }
              />
              <IconButton title="remove item">
                <CloseIcon onClick={() => dispatch(removeItem(i))} />
              </IconButton>
              {/* <button onClick={() => dispatch(removeItem(i))}>Remove</button> */}
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>

    // </div>
    // <div>
    //   <h2>Cart</h2>
    //   {items.length === 0 ? (
    //     <p>Your cart is empty</p>
    //   ) : (
    //     <>
    //       <ul>
    //         {items.map((item, i) => (
    //           <li key={`${item.id}-${i}`}>
    //             {item.title} x {item.quantity} - ${item.price * item.quantity}
    //             <button onClick={() => dispatch(removeItem(i))}>Remove</button>
    //           </li>
    //         ))}
    //       </ul>
    //       <p>Total: ${total}</p>
    //     </>
    //   )}
    // </div>
  );
};

export default Cart;

// import {
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
// } from "@mui/material";

// function Carrito() {
//   return (
//     <div>
//       <List>
//         {productosEnCarrito.map((producto) => (
//           <ListItem key={producto.id}>
//             <ListItemAvatar>
//               <Avatar alt={producto.nombre} src={producto.imagen} />
//             </ListItemAvatar>
//             <ListItemText
//               primary={producto.nombre}
//               secondary={
//                 <>
//                   <Typography
//                     component="span"
//                     variant="body2"
//                     color="text.primary"
//                   >
//                     {`Precio: $${producto.precio.toFixed(2)}`}
//                   </Typography>
//                   <br />
//                   <Typography variant="body2" color="text.secondary">
//                     {`Descripción: ${producto.descripcion}`}
//                   </Typography>
//                 </>
//               }
//             />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// }
