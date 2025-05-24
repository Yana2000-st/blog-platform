import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { updateArticle } from '../../api/articles';
import { getArticle } from '../../api/articlesApi';
import { queryClient } from '../../main';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function EditArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getArticle(slug).then(setArticle);
  }, [slug]);

  const handleEdit = async (data) => {
    try {
      const updated = await updateArticle(slug, {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.tag).filter(Boolean),
      });

      queryClient.setQueryData(['article', slug], updated);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  if (!article) return <div>Loading...</div>;

  return <ArticleForm onSubmit={handleEdit} initialValues={article} isEdit />;
}
