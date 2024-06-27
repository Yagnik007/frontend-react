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
        (item) => item.productId._id !== action.payload
      );
    },
    updateCartItemQuantity(state, action) {
      const item = state.items.find(
        (item) => item.productId._id === action.payload.id._id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
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
  updateCartItemQuantity,
} = cartSlice.actions;

export const fetchCartItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    const response = await api.get(`/cart/${user._id}/`);
    dispatch(setCartItems(response.data.items));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export const addCartItem = (item) => async (dispatch) => {
  try {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    const newCart = {
      userId: user._id,
      items: [
        {
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        },
      ],
    };
    const res = await api.post("/cart/addToCart", newCart);
    dispatch(addItemToCart(item));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    await api.put(`cart/updateCartItem/${user._id}`, {productId,quantity });
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const removeCartItem = (productId) => async (dispatch) => {
  try {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    await api.delete(`/cart/${user._id}/${productId}`,);
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

export default cartSlice.reducer;
