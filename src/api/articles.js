import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

export const createArticle = async (articleData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Вы не авторизованы');

  const response = await axios.post(
    `${API_URL}/articles`,
    {
      article: articleData,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.data.article;
};
