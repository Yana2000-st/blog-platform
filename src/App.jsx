import { Routes, Route } from 'react-router-dom';

import ArticlesListPage from './pages/ArticlesListPage/ArticlesListPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import Header from './components/Header/Header';
import styles from './App.module.scss';

export default function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<ArticlesListPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
      </div>
    </>
  );
}

