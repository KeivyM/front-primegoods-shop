import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { LogoutOutlined, NoteAdd } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import imageLogo from "../Screenshot 2023-03-28 0348323527.png";
import Cart from "./Cart";

export const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const { role } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("userAuth");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      sx={{
        background: "linear-gradient(50deg, #282e37, #555a61)",
        position: "sticky",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={imageLogo} alt={"logo - main"} height="80" />
          </Link>
        </Typography>
        <IconButton
          onClick={() => setOpenCart((prev) => !prev)}
          sx={{ ml: 2, color: " #83C227" }}
        >
          <ShoppingCartIcon fontSize="medium" bgcolor="white" />
        </IconButton>
        <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
          <Avatar />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {role === "admin" && (
            <MenuItem onClick={() => navigate("/product/create")}>
              <NoteAdd sx={{ mr: 1 }} />
              Add product
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <LogoutOutlined sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      {openCart && (
        <Box
          sx={{
            height: "90%",
            overflow: "auto",
            position: "absolute",
            zIndex: 100,
            right: 0,
            width: { xs: "100%", md: "40%" },
            background: "linear-gradient(-80deg, #282e37ee, #555a61ff)",
            color: "white",
            borderRadius: "0 0 15px 15px",
          }}
          minHeight={"80vh"}
          pt={5}
          mt={11}
        >
          <Cart />
        </Box>
      )}
    </AppBar>
  );
};
