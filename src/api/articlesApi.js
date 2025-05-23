import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

//Запрашивает список статей с сервера, по страницам (пагинация). Возвращает статьи и общее количество статей.
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

//Запрашивает конкретную статью по её уникальному идентификатору (slug). Возвращает данные этой статьи.
export const getArticle = async (slug) => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data.article;
};

//Добавляет лайк к статье (отмечает как понравившуюся).
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

//Убирает лайк с статьи.
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
