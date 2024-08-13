import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
