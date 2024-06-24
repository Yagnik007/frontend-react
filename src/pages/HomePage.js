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

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
    if (!user) {
      return;
    }
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
    <Container
      sx={{
        marginTop: "20px",
      }}
    >
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              // sx={{ backgroundColor: "#bdbdbd" }}
              onClick={() => handleOpenModal(product)}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.image}
                title={product.name}
                sx={{ margin: "10px", objectFit: "contain", cursor: "pointer" }}
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

      {/* Render the ProductModal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default HomePage;
