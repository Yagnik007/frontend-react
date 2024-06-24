import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("/products");
    dispatch(setProducts(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
