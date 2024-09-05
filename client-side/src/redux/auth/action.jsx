import { createAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';
import { getUserLogged } from '../../utils/fetch';

export const setAuth = createAction('auth/setAuth');
export const setOneUser = createAction('auth/setOneUser');
export const clearToken = createAction('auth/clearToken');

export const signin = (formdata) => async (dispatch) => {
  try {
    const { email, password } = formdata;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // ... tambahkan properti lain yang Anda perlukan
    };

    dispatch(setAuth({ user: userData, idToken }));
  } catch (error) {
    console.error('Login Error:', error);
  }
};

export const userLogged = () => async (dispatch) => {
  try {
    const res = await getUserLogged();
    const dataUser = res.data;
    dispatch(setOneUser(dataUser));
  } catch (error) {
    console.error('Get User Logged Error:', error);
  }
};
