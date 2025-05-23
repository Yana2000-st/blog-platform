import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

export const getArticles = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/articles?limit=${limit}&offset=${offset}`, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });
  return {
    articles: response.data.articles,
    articlesCount: response.data.articlesCount,
  };
};

export const getArticle = async (slug) => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data.article;
};

export const likeArticle = async (slug) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Пользователь не авторизован');
  const response = await axios.post(`${API_URL}/articles/${slug}/favorite`, null, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.article;
};

export const unlikeArticle = async (slug) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Пользователь не авторизован');
  const response = await axios.delete(`${API_URL}/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.article;
};
