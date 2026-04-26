import MainTemplate from "../../templates/MainTemplate/index.tsx";
import styles from "./style.module.css";

const NotFound = () => {
  return (
    <MainTemplate>
      <h1 className={styles.title}>404 - Página não encontrada</h1>
    </MainTemplate>
  );
};

export default NotFound;