import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addCartItem } from "../store/cartSlice"; // Import the addToCart action
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
import ProductModal from "../components/ProductModal";
import Toast, { showToast } from "../utils/toast";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    var user = localStorage.getItem("user");
    if (!user) {
      showToast("Please Login to add items in cart!!", "warn");
      return;
    }
    user = JSON.stringify(user);
    const item = { ...product, userId: user.id }; // Add user ID to product item
    dispatch(addCartItem(item));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card sx={{ borderRadius: "16px" }}>
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.image}
                title={product.name}
                onClick={() => handleOpenModal(product)}
                sx={{ margin: "10px", objectFit: "contain", cursor: "pointer" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={() => handleOpenModal(product)}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  onClick={() => handleOpenModal(product)}
                  sx={{
                    height: "48px", // Adjust based on desired line height
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  $ {product.price}
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

      {/* Render the ProductModal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={handleCloseModal}
      />
      <Toast />
    </Container>
  );
};

export default HomePage;
