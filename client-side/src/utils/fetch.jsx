import { config } from '../config';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from 'firebase/auth';

const BASE_URL = config.base_url;

async function fetchWithToken(url, options = {}) {
  const idToken = sessionStorage.getItem('idToken');

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${idToken}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  console.log(response);

  const responseJson = await response.json();

  console.log('test res json', responseJson);

  if (!response.ok) {
    alert('Email atau Password salah');
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.msg || 'Login failed');
  }

  return { error: false, data: responseJson.data };
}

async function signup({
  name,
  email,
  password,
  confirmPassword,
  no_telp,
  role,
}) {
  const response = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
      no_telp,
      role,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (!response.ok) {
    if (response.status === 500 && responseJson.msg === 'jwt expired') {
      sessionStorage.removeItem('idToken');
      window.location.href = '/login';
      return { error: true, data: null, message: 'Token has expired' };
    }
    return {
      error: true,
      data: null,
      message: responseJson?.msg || 'Fetch failed',
    };
  }

  return { error: false, data: responseJson.data };
}

export { login, signup, getUserLogged };
