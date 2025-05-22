import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Edit Profile</h2>
        <label className={styles.label}>
          Username
          <input className={styles.input} type="name" name="name" autoComplete="name" placeholder="Username" />
        </label>
        <label className={styles.label}>
          Email address
          <input
            className={styles.input}
            type="email"
            name="email"
            autoComplete="new-email"
            placeholder="Email address"
          />
        </label>
        <label className={styles.label}>
          New password
          <input
            className={styles.input}
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="New password"
          />
        </label>
        <label className={styles.label}>
          Avatar image (url)
          <input
            className={styles.input}
            type="text"
            name="image"
            autoComplete="new-image"
            placeholder="Avatar image"
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </form>
    </div>
  );
}
