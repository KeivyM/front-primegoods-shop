import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
// import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutOutlined, NoteAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Header() {
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
    } catch (error) {}

    // Lógica para cerrar sesión
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: "50px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/">Store</Link>
        </Typography>
        {/* <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
          <NoteAdd />
        </IconButton> */}
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
    </AppBar>
  );
}

export default Header;
