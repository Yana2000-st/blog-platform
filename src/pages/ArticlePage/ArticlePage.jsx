import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

import { queryClient } from '../../main';
import { getArticle, likeArticle, unlikeArticle } from '../../api/articlesApi';
import { useUser } from '../../Authorization/Authorization';
import AuthorBlock from '../../components/AuthorBlock/AuthorBlock';

import styles from './ArticlePage.module.scss';

export default function ArticlePage() {
  const { slug } = useParams();
  const { data: user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
    staleTime: 1000 * 60,
  });

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (data) {
      setLiked(data.favorited);
      setLikesCount(data.favoritesCount);
    }
  }, [data]);

  const likeMutation = useMutation({
    mutationFn: () => likeArticle(slug),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', slug], newArticle);

      queryClient.setQueriesData({ queryKey: ['articles'], exact: false }, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          articles: oldData.articles.map((a) => (a.slug === newArticle.slug ? newArticle : a)),
        };
      });

      setLiked(newArticle.favorited);
      setLikesCount(newArticle.favoritesCount);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeArticle(slug),
    onSuccess: (newArticle) => {
      queryClient.setQueryData(['article', slug], newArticle);

      queryClient.setQueriesData({ queryKey: ['articles'], exact: false }, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          articles: oldData.articles.map((a) => (a.slug === newArticle.slug ? newArticle : a)),
        };
      });

      setLiked(newArticle.favorited);
      setLikesCount(newArticle.favoritesCount);
    },
  });

  const handleLikeClick = () => {
    if (!user) return;
    liked ? unlikeMutation.mutate() : likeMutation.mutate();
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки статьи</p>;
  if (!data) return <p>Статья не найдена</p>;

  const { title, body, description, tagList, author, createdAt } = data;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title?.trim() || 'Без названия'}</h1>
              <button
                className={`${styles.likeBtn} ${liked ? styles.liked : styles.unliked} ${!user ? styles.disabledLike : ''}`}
                onClick={handleLikeClick}
                disabled={!user || likeMutation.isLoading || unlikeMutation.isLoading}
                title={!user ? 'Войдите, чтобы поставить лайк' : ''}
              >
                {liked ? '❤️' : '🤍'} <span>{likesCount}</span>
              </button>
            </div>

            {tagList.length > 0 && (
              <ul className={styles.tags}>
                {tagList
                  .filter((tag) => tag?.trim() !== '')
                  .map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag?.charAt(0).toUpperCase() + tag?.slice(1)}
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
