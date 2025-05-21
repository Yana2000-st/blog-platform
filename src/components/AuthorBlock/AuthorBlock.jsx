import { format } from 'date-fns';

import styles from './AuthorBlock.module.scss';

export default function AuthorBlock({ author, createdAt }) {
  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');
  return (
    <div className={styles.authorBlock}>
      <div className={styles.authorInfo}>
        <span className={styles.author}>{author.username}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <img className={styles.avatar} src={author.image} alt={author.username} />
    </div>
  );
}
