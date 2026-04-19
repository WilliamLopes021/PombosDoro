import { useState, useEffect } from "react";
import styles from "./Heading.module.css";
import { Bird, Clock10, Home, Settings, Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const Heading = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Utilizando a Lazy Initialization para carregar o tema
    const storageTheme = localStorage.getItem("theme") as Theme;

    return storageTheme ?? "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  const nextThemeIcon = {
    dark: <Sun />,
    light: <Moon />,
  }

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
          {nextThemeIcon[theme]}
        </a>
      </nav>
    </div>
  );
};

export default Heading;
