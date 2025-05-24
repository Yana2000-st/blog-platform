import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../Authorization/Authorization';
import { queryClient } from '../../main';
import { profileUser } from '../../api/auth';

import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: currentUser } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
  });

  // функция, вызывается при отправке формы
  const onSubmit = async (data) => {
    try {
      const payload = {};

      if (data.username && data.username !== currentUser?.username) {
        payload.username = data.username;
      }
      if (data.email && data.email !== currentUser?.email) {
        payload.email = data.email;
      }
      if (data.password) {
        payload.password = data.password;
      }
      if (data.avatar && data.avatar !== currentUser?.image) {
        payload.image = data.avatar;
      }

      if (Object.keys(payload).length === 0) return;

      const response = await profileUser(payload);

      localStorage.setItem('token', response.user.token);
      await queryClient.invalidateQueries(['currentUser']);
      navigate('/');
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors?.email) {
        const message = Array.isArray(serverErrors.email) ? serverErrors.email.join(', ') : serverErrors.email;
        setError('email', { message });
      }
      if (serverErrors?.username) {
        const message = Array.isArray(serverErrors.username) ? serverErrors.username.join(', ') : serverErrors.username;
        setError('username', { message });
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset({
        username: currentUser.username || '',
        email: currentUser.email || '',
        avatar: currentUser.image || '',
      });
    }
  }, [currentUser, reset]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Edit Profile</h2>

        {/* Username */}
        <label className={styles.label}>
          Username
          <input
            className={`${styles.input} ${errors.username ? styles.errorInput : ''}`}
            {...register('username', {
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: { value: 20, message: 'Максимум 20 символов' },
              pattern: {
                value: /^[a-zA-Z0-9_-]{3,20}$/,
                message: 'Имя может содержать только латинские буквы, цифры, дефис и подчёркивание',
              },
            })}
            placeholder="Username"
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </label>

        {/* Email */}
        <label className={styles.label}>
          Email address
          <input
            className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
            {...register('email', {
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Введите корректный email',
              },
            })}
            placeholder="Email address"
          />
          {(errors.email?.message || errors.email) && <span className={styles.error}>{errors.email.message}</span>}
        </label>

        {/* Пароль */}
        <label className={styles.label}>
          Password
          <input
            className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
            type="password"
            {...register('password', {
              minLength: { value: 6, message: 'Минимум 6 символов' },
              maxLength: { value: 40, message: 'Максимум 40 символов' },
              pattern: {
                value: /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).{6,}$/,
                message: 'Пароль должен содержать хотя бы одну букву и одну цифру',
              },
            })}
            placeholder="Password"
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </label>

        {/* Аватар */}
        <label className={styles.label}>
          Avatar image (url)
          <input
            className={`${styles.input} ${errors.text ? styles.errorInput : ''}`}
            type="text"
            {...register('avatar', {
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Введите корректный URL изображения',
              },
            })}
            placeholder="Avatar image"
          />
          {errors.avatar && <span className={styles.error}>{errors.avatar.message}</span>}
        </label>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </form>
    </div>
  );
}
