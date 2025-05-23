import AppRoutes from './AppRoutes/AppRoutes';
import Header from './components/Header/Header';
import styles from './App.module.scss';

export default function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <AppRoutes />
      </div>
    </>
  );
}
