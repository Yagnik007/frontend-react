import React from "react";
import { addCartItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ product, open, onClose }) => {
  const dispatch = useDispatch();

  const onAddToCart = (product) => {
    const user = JSON.stringify(localStorage.getItem('user'))
    if (!user) {
      return;
    }
    const item = { ...product, userId: user.id }; // Add user ID to product item
    dispatch(addCartItem(item));
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {product.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
          ${product.price}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ marginTop: 2, textAlign: "center" }}
        >
          {product.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onAddToCart(product)}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "darkgrey" },
          }}
        >
          Add to Cart
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
