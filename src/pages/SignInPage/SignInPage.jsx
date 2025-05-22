import { useForm } from 'react-hook-form';

import { loginUser } from '../../api/auth';

import styles from './SignInPage.module.scss';

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // функция, вызывается при отправке формы
  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('token', response.user.token);
      alert('Успешный вход!');
    } catch (error) {
      const serverErrors = error.response?.data?.errors;

      if (serverErrors?.['email or password']) {
        setError('password', { message: 'Неверный email или пароль' });
      }

      if (serverErrors?.email) {
        setError('email', { message: serverErrors.email.join(', ') });
      }

      if (serverErrors?.password) {
        setError('password', { message: serverErrors.password.join(', ') });
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Sign In</h2>

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
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </label>

        {/* Пароль */}
        <label className={styles.label}>
          Password
          <input
            className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
            type="Password"
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
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <p className={styles.redirect}>
          Don’t have an account? <a href="/sign-up">Sign Up</a>.
        </p>
      </form>
    </div>
  );
}
