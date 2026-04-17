import styles from "./Heading.module.css";
import { Bird, Clock10, Home, Settings, Sun } from "lucide-react";

const Heading = () => {
  return (
    <div>
      <div className={styles.heading}>
        <Bird size={100} />
        <h1>PombosDoro</h1>
      </div>

      <nav className={styles.navContainer}>
        <a aria-label="Home" className={styles.navItem}>
          <Home />
        </a>
        <a aria-label="Histórico" className={styles.navItem}>
          <Clock10 />
        </a>
        <a aria-label="Configurações" className={styles.navItem}>
          <Settings />
        </a>
        <a aria-label="Tema" className={styles.navItem}>
          <Sun />
        </a>
      </nav>
    </div>
  );
};

export default Heading;
