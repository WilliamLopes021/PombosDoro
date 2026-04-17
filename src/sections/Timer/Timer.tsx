import styles from "./Timer.module.css";
import Input from "../../components/InputComponent/Input";
import Button from "../../components/Button/Button";
import Cycles from "../../components/Cycles/Cycles";
import { Play } from "lucide-react";

const Timer = () => {
  return (
    <>
      <span className={styles.time}>00:00</span>

      <div className={styles.taskContainer}>
        <p>task:</p>
        <Input placeholder="Digite sua tarefa" type="text"/>
        <p>
          Nesse ciclo <b>foque</b> por <b>25 min.</b>
        </p>

        <Cycles />
        <Button > <Play /> Iniciar</Button>
      </div>
    </>
  );
};

export default Timer;
