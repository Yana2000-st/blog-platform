import { Route, Routes } from 'react-router-dom';

import ArticlesListPage from './pages/ArticlesListPage/ArticlesListPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Header from './components/Header/Header';
import styles from './App.module.scss';

export default function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route exact path="/" element={<ArticlesListPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </>
  );
}
