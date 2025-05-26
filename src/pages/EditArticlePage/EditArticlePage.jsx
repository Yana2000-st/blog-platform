import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useUser } from '../../Authorization/Authorization';
import { updateArticle } from '../../api/articles';
import { getArticle } from '../../api/articlesApi';
import { queryClient } from '../../main';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function EditArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const { data: user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    getArticle(slug).then((fetchedArticle) => {
      setArticle(fetchedArticle);

      // Проверка авторства
      if (!user || fetchedArticle.author.username !== user.username) {
        navigate('/');
      }
    });
  }, [slug, user, navigate]);

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

  if (!article) return <div>Загрузка статьи...</div>;

  if (!user || user.username !== article.author.username) return <div>❌ Вы не можете редактировать чужую статью</div>;

  return <ArticleForm onSubmit={handleEdit} initialValues={article} isEdit />;
}
