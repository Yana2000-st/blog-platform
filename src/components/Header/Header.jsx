import { NavLink } from 'react-router-dom';

import { useUser } from '../../Authorization/Authorization';
import { queryClient } from '../../main';

import styles from './Header.module.scss';

const Header = () => {
  const { data: user } = useUser();
  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.removeQueries(['currentUser']);
    window.location.reload();
  };
  return (
    <header className={styles.header}>
      <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.logo} ${styles.active}` : styles.link)}>
        Realworld Blog
      </NavLink>

      {!user ? (
        <div className={styles.auth}>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/sign-up"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Sign Up
          </NavLink>
        </div>
      ) : (
        <div className={styles.auth}>
          <NavLink
            to="/new-article"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Create article
          </NavLink>

          <NavLink to="/profile" className={styles.profileLink}>
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            <img src={user.image} alt={user.username} className={styles.avatar} />
          </NavLink>

          <button onClick={handleLogout} className={styles.link}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
