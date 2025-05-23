import { Link } from 'react-router-dom';

import AuthorBlock from '../AuthorBlock/AuthorBlock';

import styles from './ArticleCard.module.scss';

export default function ArticleCard({ article }) {
  const { title, description, tagList, author, slug, favoritesCount, createdAt } = article;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              <Link to={`/articles/${slug}`}>{title?.trim() || 'Без названия'}</Link>
            </h2>
            <button className={styles.likeBtn} disabled>
              🤍<span>{favoritesCount}</span>
            </button>
          </div>
        </div>

        <AuthorBlock author={author} createdAt={createdAt} />
      </div>

      <ul className={styles.tags}>
        {tagList
          .filter((tag) => tag.trim() !== '')
          .map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </li>
          ))}
      </ul>

      <p className={styles.description}>{description}</p>
    </div>
  );
}
