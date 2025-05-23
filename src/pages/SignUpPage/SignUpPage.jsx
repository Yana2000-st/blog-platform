import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../api/auth';

import styles from './SignUpPage.module.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  //  useForm для управления формой
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // функция, вызывается при отправке формы
  const onSubmit = async (data) => {
    try {
      // отправляю данные на сервер
      const response = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // сохраняю токен в localStorage
      localStorage.setItem('token', response.user.token);
      navigate('/');
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
        <h2 className={styles.title}>Create new account</h2>

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
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
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

        {/* Повтор пароля */}
        <label className={styles.label}>
          Repeat Password
          <input
            className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
            type="password"
            {...register('repeatPassword', {
              required: 'Повторите пароль',
              validate: (value) => value === watch('password') || 'Пароли не совпадают',
            })}
            placeholder="Password"
          />
          {errors.repeatPassword && (
            <span className={styles.error}>
              Пароли не совпадают, пожалуйста, проверьте правильность введенных паролей
            </span>
          )}
        </label>

        {/* Галочка согласия */}
        <hr className={styles.hr} />
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register('agree', { required: true })} className={styles.checkbox} />I agree to the
          processing of my personal information
        </label>
        {errors.agree && <span className={styles.error}>Cогласие на обработку персональных данных обязательно</span>}

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
        <p className={styles.redirect}>
          Already have an account? <a href="/sign-in">Sign In</a>.
        </p>
      </form>
    </div>
  );
}
