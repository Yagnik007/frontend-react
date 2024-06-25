import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export const register = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/users/register", userData);
    dispatch(setUser(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.post("/users/login", userData);
    dispatch(setUser(response.data));
    const user = JSON.stringify(response.data)
    localStorage.setItem("user", user);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
