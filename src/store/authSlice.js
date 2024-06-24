import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setAuthenticated, setLoading, setError, logout } =
  authSlice.actions;

export const login = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/users/login", userData);
    dispatch(setToken(response.data.token));
    dispatch(setAuthenticated(true));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/users/register", userData);
    dispatch(setToken(response.data.token));
    dispatch(setAuthenticated(true));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
