import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  user: null | Record<string, unknown>;
  token: null | string;
};

const initialState: StateType = {
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
