import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, {
    user: userData,
  });
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    user: userData,
  });
  return response.data;
};
