import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
  removeItemFromCart,
  updateCartItem,
  updateCartItemQuantity,
} from "../store/cartSlice";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { debounce } from "../utils/debounce";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id._id));
    debounceRemoveItem(id._id);
  };

  const debounceRemoveItem = debounce((id) => {
    dispatch(removeCartItem(id));
  }, 500);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartItemQuantity({ id, quantity }));
      debouncedUpdateQuantity(id, quantity);
    }
  };

  const debouncedUpdateQuantity = debounce((productId, newQuantity) => {
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  }, 500);

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom fontFamily={""}>
        Cart Items
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item key={item.id} xs={12}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="div"
                >
                  ₹{item.price}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <IconButton
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity + 1)
                    }
                    disabled = {item.quantity >= 10}
                  >
                    <Add />
                  </IconButton>
                </Box>
              </CardContent>
              <IconButton
                onClick={() => handleRemoveItem(item.productId)}
                sx={{ marginLeft: "auto" }}
              >
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: "right" }}>
        <Typography variant="h6">Subtotal: ₹{getTotal()}</Typography>
        <Typography variant="h6">Shipping: ₹40</Typography>
        <Typography variant="h5" gutterBottom>
          Total: ₹{getTotal() + 40} INR
        </Typography>
        <Button variant="contained" color="primary">
          Check out
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
