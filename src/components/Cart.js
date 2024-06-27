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
  LinearProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
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
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  const shippingCost = 10;
  const freeDeliveryThreshold = 1000;
  const subtotal = getTotal();
  const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  return (
    <Container
      sx={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Cart Items
      </Typography>
      {/* Cart Items Section */}
      <Box
        sx={{
          flex: "1 1 70%",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        }}
      >
        {cartItems.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            Cart is empty
          </Typography>
        ) : (
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
                    sx={{ width: 151, height: 151, objectFit: "cover" }}
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
                      $ {item.price}
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
                  <Button
                    onClick={() => handleRemoveItem(item.productId)}
                    sx={{
                      marginLeft: "auto",
                      color: "red",
                      fontSize: "0.8rem",
                    }}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Payment Details Section */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            flex: "0 1 30%",
            padding: "20px",
            position: "sticky",
            top: "20px",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Subtotal: $ {subtotal.toFixed(2)}
          </Typography>
          {subtotal < freeDeliveryThreshold && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Shipping: $ {shippingCost.toFixed(2)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ marginY: 2 }}
              />
              <Typography variant="body2" color="textSecondary">
                Add ${freeDeliveryThreshold - subtotal} worth of products more
                to get free delivery!
              </Typography>
            </>
          )}
          {subtotal >= freeDeliveryThreshold && (
            <Typography variant="h6" color="green" gutterBottom>
              Your order is eligible for free delivery!
            </Typography>
          )}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Total: $
            {(subtotal >= freeDeliveryThreshold
              ? subtotal
              : subtotal + shippingCost
            ).toFixed(2)}
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
      )}
    </Container>
  );
};

export default Cart;
