import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import ArticlesListPage from '../pages/ArticlesListPage/ArticlesListPage';
import ArticlePage from '../pages/ArticlePage/ArticlePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import CreateArticlePage from '../pages/CreateArticlePage/CreateArticlePage';

import PrivateRoute from './PrivateRoute/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<ArticlesListPage />} />
      <Route path="/articles" element={<ArticlesListPage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/new-article"
        element={
          <PrivateRoute>
            <CreateArticlePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
