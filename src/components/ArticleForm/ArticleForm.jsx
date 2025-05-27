import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

import styles from './ArticleForm.module.scss';

export default function ArticleForm({ onSubmit, initialValues = {}, isEdit = false, loading = false }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [{ tag: '' }],
    },
  });

  useEffect(() => {
    if (initialValues.title) {
      reset({
        title: initialValues.title,
        description: initialValues.description,
        body: initialValues.body,
        tagList: initialValues.tagList?.length > 0 ? initialValues.tagList.map((tag) => ({ tag })) : [{ tag: '' }],
      });
    }
  }, [initialValues, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>{isEdit ? 'Edit Article' : 'Create New Article'}</h2>

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

        {/* Description */}
        <label className={styles.label}>
          Short description
          <input
            className={`${styles.input} ${errors.description ? styles.errorInput : ''}`}
            {...register('description', { required: 'Введите описание' })}
            placeholder="Title"
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </label>

        {/* Text */}
        <label className={styles.label}>
          Text
          <textarea
            className={`${styles.textarea} ${errors.body ? styles.errorInput : ''}`}
            {...register('body', { required: 'Введите текст статьи' })}
            placeholder="Text"
          />
          {errors.body && <span className={styles.error}>{errors.body.message}</span>}
        </label>

        {/* Tags */}
        <label className={styles.label}>
          Tags
          <div className={styles.tagsBlock}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.tagWrapper}>
                <input className={styles.tagInput} {...register(`tagList.${index}.tag`)} placeholder="Tag" />
                <div className={styles.tagButtons}>
                  <button type="button" onClick={() => remove(index)} className={styles.removeTag}>
                    Delete
                  </button>

                  {index === fields.length - 1 && (
                    <button type="button" onClick={() => append({ tag: '' })} className={styles.addTag}>
                      Add Tag
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </label>

        <button type="submit" className={styles.saveButton} disabled={loading}>
          {loading ? 'Загрузка...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
