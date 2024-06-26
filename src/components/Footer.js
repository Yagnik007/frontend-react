import React from "react";
// import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#D3D3D3",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            ml: 10,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          &copy; 2023 Bazaar
        </Typography>
        {/* <div>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "black",
              margin: "0 10px",
              fontFamily: "Rajdhani, sans-serif",
            }}
          >
            About Us
          </Link>
          <Link
            to="/privacy"
            style={{
              textDecoration: "none",
              color: "black",
              margin: "0 10px",
              fontFamily: "Rajdhani, sans-serif",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            style={{
              textDecoration: "none",
              color: "black",
              margin: "0 10px",
              fontFamily: "Rajdhani, sans-serif",
            }}
          >
            Terms of Service
          </Link>
        </div> */}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
