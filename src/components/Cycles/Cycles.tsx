import styles from "./Cycles.module.css";
import useTaskContext from "../../contexts/TaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

const Cycles = () => {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });
  const focusIndicator = {
    workTime: "Foco",
    shortBreakTime: "Pausa curta",
    longBreakTime: "Pausa longa",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos</span>
      <div className={styles.cyclesDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`indicador de ciclo de ${focusIndicator[nextCycleType]}.`}
              title={`indicador de ciclo de ${focusIndicator[nextCycleType]}.`}
              key={`${nextCycle}-${nextCycleType}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default Cycles;
