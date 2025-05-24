import { useNavigate } from 'react-router-dom';

import { createArticle } from '../../api/articles';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

export default function CreateArticlePage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createArticle({
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.tag).filter(Boolean),
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании статьи:', error);
    }
  };

  return <ArticleForm onSubmit={handleCreate} />;
}
