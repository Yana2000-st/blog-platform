import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

export const getArticles = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`${API_URL}/articles?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getArticle = async (slug) => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data.article;
};
