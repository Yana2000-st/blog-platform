import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={({ isActive }) => `${styles.logo} ${isActive ? styles.active : ''}`}>
        Realworld Blog
      </NavLink>
      <div className={styles.auth}>
        <NavLink to="/sign-in" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
          Sign In
        </NavLink>
        <NavLink to="/sign-up" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
          Sign Up
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
