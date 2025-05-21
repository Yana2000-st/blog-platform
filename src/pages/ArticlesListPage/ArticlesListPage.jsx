import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pagination } from 'antd';

import { getArticles } from '../../api/articlesApi';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

import styles from './ArticlesListPage.module.scss';

export default function ArticlesListPage() {
  const [page, setPage] = useState(1);

  // получаю статьи с сервера
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', page], // ключ для кэширования запроса
    queryFn: () => getArticles(page), // функция, которая вызывает API
    keepPreviousData: true, // сохраняет данные прошлой страницы при загрузке новой
  });

  if (isLoading) {
    return <p>Идет загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки: {error.message}</p>;
  }

  if (!data) {
    return <p>Данные не получены...</p>;
  }

  const totalArticles = data.articlesCount;
  const pageSize = 10;

  return (
    <div className={styles.container}>
      {data.articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}

      <div className={styles.pagination}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalArticles}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
