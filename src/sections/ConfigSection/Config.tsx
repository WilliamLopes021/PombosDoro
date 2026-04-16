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

      <div className={styles.inputContainer}>
        <p>Foco (min)</p>
        <Input />

        <p>Pausa curta (min)</p>
        <Input />

        <p>Pausa longa (min)</p>
        <Input />
      </div>
    </>
  );
};

export default Config;
