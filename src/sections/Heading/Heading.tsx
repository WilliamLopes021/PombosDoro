import { useState } from "react";
import styles from "./Heading.module.css";
import { Bird, Clock10, Home, Settings, Sun } from "lucide-react";

type Theme = "light" | "dark";

const Heading = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <div>
      <div className={styles.heading}>
        <Bird size={100} />
        <h1>PombosDoro</h1>
      </div>

      <nav className={styles.navContainer}>
        <a aria-label="Home" title="Home" href="#" className={styles.navItem}>
          <Home />
        </a>
        <a
          aria-label="Histórico"
          title="Histórico"
          href="#"
          className={styles.navItem}
        >
          <Clock10 />
        </a>
        <a
          aria-label="Configurações"
          title="Configurações"
          href="#"
          className={styles.navItem}
        >
          <Settings />
        </a>
        <a
          aria-label="Tema"
          title="Tema"
          href="#"
          className={styles.navItem}
          onClick={handleClick}
        >
          <Sun />
        </a>
      </nav>
    </div>
  );
};

export default Heading;
