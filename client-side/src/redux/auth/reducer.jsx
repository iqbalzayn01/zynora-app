import { createReducer } from '@reduxjs/toolkit';
import { setAuth, setOneUser, clearToken } from './action';

const initialState = {
  user: null,
  idToken: sessionStorage.getItem('idToken') || null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuth, (state, action) => {
      state.idToken = action.payload.idToken;
      state.user = action.payload.user;
      sessionStorage.setItem('idToken', action.payload.idToken);
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(clearToken, (state) => {
      state.idToken = '';
      sessionStorage.removeItem('idToken');
    });
});

export default authReducer;
