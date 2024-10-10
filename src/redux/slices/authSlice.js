import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  language: 'english',
  rememberMe: {
    enabled: false,
    email: '',
    password: '',
    phone: '',
    signInWith: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
