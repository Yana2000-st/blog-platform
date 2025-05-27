import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { createArticle } from '../../api/articles';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const newArticle = await createArticle({
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.tag).filter(Boolean),
      });

      navigate(`/articles/${newArticle.slug}`);
    } catch (error) {
      console.error('Ошибка при создании статьи:', error);
    } finally {
      setLoading(false);
    }
  };

  return <ArticleForm onSubmit={handleCreate} loading={loading} />;
}
