import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

// Создаёт новую статью на сервере, требует авторизации
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

// Обновляет статью по slug, требует авторизации
export const updateArticle = async (slug, articleData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/articles/${slug}`,
    { article: articleData },
    { headers: { Authorization: `Token ${token}` } }
  );
  return response.data.article;
};

// Удаляет статью по slug, требует авторизации
export const deleteArticle = async (slug) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/articles/${slug}`, {
    headers: { Authorization: `Token ${token}` },
  });
};
