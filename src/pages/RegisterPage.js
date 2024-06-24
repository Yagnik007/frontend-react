import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  if (user && user._id) {
    navigate("/");
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#bdbdbd",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: "20px", backgroundColor: "black" }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;