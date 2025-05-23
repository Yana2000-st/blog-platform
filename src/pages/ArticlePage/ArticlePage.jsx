import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';

import { getArticle } from '../../api/articlesApi';
import AuthorBlock from '../../components/AuthorBlock/AuthorBlock';

import styles from './ArticlePage.module.scss';

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки статьи</p>;
  if (!data) return <p>Статья не найдена</p>;

  const { title, body, description, tagList, author, favoritesCount, createdAt } = data;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title?.trim() ? title : 'Без названия'}</h1>
              <button className={styles.likeBtn} disabled>
                🤍 <span>{favoritesCount}</span>
              </button>
            </div>

            {tagList.length > 0 && (
              <ul className={styles.tags}>
                {tagList.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <AuthorBlock author={author} createdAt={createdAt} />
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.markdown}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
