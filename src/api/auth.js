import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

//Регистрирует нового пользователя, отправляя его данные на сервер.
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, {
    user: userData,
  });
  return response.data;
};

//Логинит пользователя, отправляя его логин и пароль на сервер.
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    user: userData,
  });
  return response.data;
};

//Обновляет профиль пользователя (например, имя, аватар), требует авторизацию через токен.
export const profileUser = async (userData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/user`,
    { user: userData },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

//Получает данные текущего залогиненного пользователя, используя токен.
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data.user;
};
