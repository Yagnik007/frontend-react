import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#D3D3D3", color: "black" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bazar
        </Typography>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Home
        </Link>
        <Link
          to="/products"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Products
        </Link>
        <Link
          to="/cart"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
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
