import { NavLink, useNavigate } from 'react-router-dom';

import { useUser } from '../../Authorization/Authorization';
import { queryClient } from '../../main';
import { DEFAULT_AVATAR } from '../../Constants/index.js';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const handleLogout = () => {
    const confirmed = window.confirm('Вы уверены, что хотите выйти?');
    if (!confirmed) return;

    localStorage.removeItem('token');
    queryClient.removeQueries(['currentUser']);
    navigate('/');
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
            <img src={user.image || DEFAULT_AVATAR} alt={user.username} className={styles.avatar} />
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
