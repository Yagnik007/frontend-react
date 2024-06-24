import { createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api"; // Import your API utility

const initialState = {
  user: null, // Make sure user is part of the initial state
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post("/auth/login", credentials);
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user)); // Save user to local storage
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

export const checkUser = () => (dispatch) => {
  const user = localStorage.getItem("user");
  if (user) {
    dispatch(loginSuccess(JSON.parse(user)));
  }
};

export default authSlice.reducer;
