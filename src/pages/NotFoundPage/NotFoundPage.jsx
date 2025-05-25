import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Страница не найдена</h1>
      <Link to="/" className={styles.link}>
        Перейти на главную страницу
      </Link>
    </div>
  );
}
