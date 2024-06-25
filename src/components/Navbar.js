import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
    navigate("/login");
  };

  const checkCart = () => {
    if (!user) {
      toast.warning("Login to access cart");
    } else {
      navigate("/cart");
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
          to="/contact"
          style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
        >
          Contact
        </Link>
        {user ? (
          <>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
              }}
              onClick={checkCart}
            >
              Cart
            </Link>
            <Button
              onClick={handleLogout}
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
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
              }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "black",
                margin: "0 10px",
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
