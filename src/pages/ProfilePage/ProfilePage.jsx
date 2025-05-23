import { useForm } from 'react-hook-form';
import { Avatar } from 'antd';

import { queryClient } from '../../main';
import { profileUser } from '../../api/auth';

import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  // функция, вызывается при отправке формы
  const onSubmit = async (data) => {
    try {
      // отправляю данные на сервер
      const response = await profileUser({
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.avatar,
      });

      // сохраняю токен в localStorage
      localStorage.setItem('token', response.user.token);

      await queryClient.invalidateQueries(['currentUser']);

      alert('Редактирование прошло успешно!');
    } catch (error) {
      // если есть ошибки от сервера — покажу под полями
      const serverErrors = error.response?.data?.errors;
      if (serverErrors?.email) {
        setError('email', { message: serverErrors.email.join(', ') });
      }
      if (serverErrors?.username) {
        setError('username', { message: serverErrors.username.join(', ') });
      }
    }
  };

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
              required: 'Введите имя',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: { value: 20, message: 'Максимум 20 символов' },
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9]*$/u,
                message: 'Имя должно начинаться с буквы и может содержать цифры',
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
              required: 'Введите email',
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
              required: 'Введите пароль',
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
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
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
