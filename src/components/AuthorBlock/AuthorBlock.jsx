import { format } from 'date-fns';

import { DEFAULT_AVATAR } from '../../Constants/index.js';

import styles from './AuthorBlock.module.scss';

export default function AuthorBlock({ author, createdAt }) {
  const formattedDate = createdAt ? format(new Date(createdAt), 'MMMM d, yyyy') : '';
  return (
    <div className={styles.authorBlock}>
      <div className={styles.authorInfo}>
        <span className={styles.author}>{author.username.charAt(0).toUpperCase() + author.username.slice(1)}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <img className={styles.avatar} src={author.image || DEFAULT_AVATAR} alt={author.username} />
    </div>
  );
}
