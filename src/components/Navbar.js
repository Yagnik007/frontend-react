import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = () => {
  const checkCart = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.warning("Login to access cart");
    }
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#D3D3D3", color: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bazaar
        </Typography>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Home
        </Link>
        <Link
          to="/cart"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
          onClick={() => checkCart()}
        >
          Cart
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Contact
        </Link>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Sign In
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Sign Up
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
