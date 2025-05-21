import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>
      <div className={styles.auth}>
        <Link to="/sign-in" className={styles.link}>
          Sign In
        </Link>
        <Link to="/sign-up" className={`${styles.link} ${styles.linkSignUp}`}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
