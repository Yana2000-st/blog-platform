import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { getArticles } from '../../api/articlesApi';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

import styles from './ArticlesListPage.module.scss';

export default function ArticlesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', page],
    queryFn: () => getArticles(page),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <p className={styles.center}>Идет загрузка...</p>;
  }

  if (error) {
    return <p className={styles.center}>Ошибка загрузки: {error.message}</p>;
  }

  if (!data) {
    return <p className={styles.center}>Данные не получены...</p>;
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
          onChange={(newPage) => setSearchParams({ page: newPage })}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
