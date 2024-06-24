import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    addItemToCart(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCartItems,
  addItemToCart,
  removeItemFromCart,
  setLoading,
  setError,
} = cartSlice.actions;

export const fetchCartItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("/cart");
    dispatch(setCartItems(response.data.items));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export const addCartItem = (item) => async (dispatch) => {
  try {
    // Call API to add item to cart
    await api.post("/cart", item);
    dispatch(addItemToCart(item));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export const removeCartItem = (productId) => async (dispatch) => {
  try {
    // Call API to remove item from cart
    await api.delete(`/cart/${productId}`);
    dispatch(removeItemFromCart(productId));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// You can add more actions for updating quantities, clearing cart, etc. as needed

export default cartSlice.reducer;
