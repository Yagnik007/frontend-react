import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser, isLogin } from "../store/userSlice";

const Navbar = () => {
  const [isLoginState, setIsLoginState] = useState(false);
  const navigate = useNavigate();
  const { user, islogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    if (islogin) {
      setIsLoginState(true);
    }
  }, [islogin]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoginState(false);
    dispatch(isLogin());
    toast.success("Successfully logged out");
    dispatch(setUser(null));
    navigate("/login");
  };

  const checkCart = () => {
    if (!user && !localUser) {
      toast.warning("Login to access cart");
    } else {
      navigate("/cart");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#D3D3D3", color: "black", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            ml: 10,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          Bazaar
        </Typography>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            margin: "0 10px",
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          Home
        </Link>
        <Link
          to="/contact"
          style={{
            textDecoration: "none",
            color: "black",
            margin: "0 10px",
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          Contact
        </Link>
        {isLoginState ? (
          <>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
                fontFamily: "Rajdhani, sans-serif",
              }}
              onClick={checkCart}
            >
              Cart
            </Link>
            <Button
              onClick={handleLogout}
              sx={{
                color: "black",
                margin: "0 10px",
                fontFamily: "Rajdhani, sans-serif",
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
                fontFamily: "Rajdhani, sans-serif",
              }}
            >
              SIGN IN
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
                fontFamily: "Rajdhani, sans-serif",
              }}
            >
              SIGN UP
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
