import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createArticle } from '../../api/articles';

import styles from './CreateArticlePage.module.scss';

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tagList: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = async (data) => {
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.value).filter(Boolean),
      };

      await createArticle(articleData);
      navigate('/');
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors?.title) {
        setError('title', { message: serverErrors.title.join(', ') });
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create new article</h2>

        {/* Title */}
        <label className={styles.label}>
          Title
          <input
            className={`${styles.input} ${errors.title ? styles.errorInput : ''}`}
            {...register('title', { required: 'Введите заголовок' })}
            placeholder="Title"
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </label>

        {/* Short description*/}
        <label className={styles.label}>
          Short description
          <input
            className={`${styles.input} ${errors.description ? styles.errorInput : ''}`}
            type="text"
            {...register('description', { required: 'Введите описание' })}
            placeholder="Title"
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </label>

        {/* Text */}
        <label className={styles.label}>
          Text
          <textarea
            className={`${styles.input} ${styles.textarea} ${errors.body ? styles.errorInput : ''}`}
            {...register('body', { required: 'Введите текст статьи' })}
            placeholder="Text"
          />
          {errors.body && <span className={styles.error}>{errors.body.message}</span>}
        </label>

        {/* Tags */}
        <div className={styles.tagsBlock}>
          <label>Tags</label>

          {fields.map((field, index) => (
            <div key={field.id} className={styles.tagWrapper}>
              <input className={styles.tagInput} {...register(`tagList.${index}.value`)} placeholder="Tag" />
              <div className={styles.tagButtons}>
                <button type="button" onClick={() => remove(index)} className={`${styles.tagButton} ${styles.delete}`}>
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => append({ value: '' })}
                  className={`${styles.tagButton} ${styles.add}`}
                >
                  Add tag
                </button>
              </div>
            </div>
          ))}

          <button type="submit" className={styles.saveButton}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
