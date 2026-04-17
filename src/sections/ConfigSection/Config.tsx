import Input from "../../components/InputComponent/Input";
import styles from "./Config.module.css";

const Config = () => {
  return (
    <>
      <div className={styles.heading}>
        <h1> Configurações </h1>
        <p>
          Configure seus minutos e intervalos de atenção plena e pausas para
          descanso.
        </p>
      </div>

      <form className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="focus">Foco (min)</label>
          <Input placeholder="25" type="number"/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="shortBreak">Pausa curta (min)</label>
          <Input placeholder="5" type="number" id="shortBreak"/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="longBreak">Pausa longa (min)</label>
          <Input placeholder="15" type="number" id="longBreak"/>
        </div>
      </form>
    </>
  );
};

export default Config;
