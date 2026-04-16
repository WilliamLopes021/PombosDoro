import styles from "./Heading.module.css";
import Button from "../../components/Button/Button";
import { Bird, Clock10, Home, Settings, Sun } from "lucide-react";

const Heading = () => {
  return (
    <div>
      <div className={styles.heading}>
        <Bird size={100} color="var(--primary)" />
        <h1>PombosDoro</h1>
      </div>

      <span className={styles.buttonContainer}>
        <Button>
          <Home />
        </Button>
        <Button>
          <Clock10 />
        </Button>
        <Button>
          <Settings />
        </Button>
        <Button>
          <Sun />
        </Button>
      </span>
    </div>
  );
};

export default Heading;
