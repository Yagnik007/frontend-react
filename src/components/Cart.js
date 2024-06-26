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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      toast.warning("Please login to access the cart");
    } else {
      dispatch(fetchCartItems());
    }
  }, [dispatch, navigate]);

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
    const total = cartItems.reduce(
      (total, item) => total + 40 + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <Container sx={{ marginTop: "20px", fontFamily: "Poppins" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Cart Items
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Cart is empty
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item key={item.id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: "1 0 auto", ml: 2 }}>
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
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
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
            <Typography variant="h6" gutterBottom>
              Subtotal: ₹{getTotal() - 40}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Shipping: ₹40
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Total: ₹{getTotal()} INR
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000000", color: "#ffffff" }}
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Check out
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
