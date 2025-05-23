import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../main';
import { useUser } from '../../Authorization/Authorization';
import { likeArticle, unlikeArticle } from '../../api/articlesApi';
import AuthorBlock from '../AuthorBlock/AuthorBlock';

import styles from './ArticleCard.module.scss';

export default function ArticleCard({ article }) {
  const { title, description, tagList, author, slug, favoritesCount, favorited, createdAt } = article;
  const { data: user } = useUser();

  const [liked, setLiked] = useState(favorited);
  const [likesCount, setLikesCount] = useState(favoritesCount);

  useEffect(() => {
    setLiked(favorited);
    setLikesCount(favoritesCount);
  }, [favorited, favoritesCount]);

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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            <Link to={`/articles/${slug}`}>{title?.trim() || 'Без названия'}</Link>
          </h2>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : styles.unliked} ${!user ? styles.disabledLike : ''}`}
            onClick={handleLikeClick}
            disabled={!user || likeMutation.isLoading || unlikeMutation.isLoading}
            title={!user ? 'Войдите, чтобы поставить лайк' : ''}
          >
            {liked ? '❤️' : '🤍'} <span>{likesCount}</span>
          </button>
        </div>

        <AuthorBlock author={author} createdAt={createdAt} />
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

      <p className={styles.description}>{description}</p>
    </div>
  );
}
