import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addItemToCart } from "../store/cartSlice"; // Import the addToCart action
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Button,
} from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product)); // Dispatch the addToCart action with the selected product
  };

  return (
    <Container
      sx={{
        marginTop: "20px",
      }}
    >
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#bdbdbd" }}>
              <CardMedia
                component="img"
                alt={product.name}
                height="200" // Adjust the height to make the image smaller
                width="100%" // Ensure the image fits the width of the card
                image={product.image}
                title={product.name}
                sx={{ margin: "10px", objectFit: "contain" }} // Ensure the entire image is visible without distortion
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  ${product.price}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginLeft: "auto", // Align the button to the right
                      marginTop: "20px",
                      backgroundColor: "black",
                    }}
                    onClick={() => handleAddToCart(product)} // Call handleAddToCart function onClick
                  >
                    Add to Cart
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
