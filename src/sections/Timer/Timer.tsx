import styles from "./Timer.module.css";
import Input from "../../components/InputComponent/Input";
import Button from "../../components/Button/Button";
import Cycles from "../../components/Cycles/Cycles";
import { Play, StopCircle } from "lucide-react";
import useTaskContext from "../../contexts/TaskContext";
import { useState } from "react";
import type { TaskModelType } from "../../types/Task/TaskModelType";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TypeAction } from "../../contexts/TaskContext/taskActions";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

const Timer = () => {
  const [taskName, setTaskName] = useState("");

  const { state, dispatch } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleCreateTask = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastifyAdapter.dismiss();

    const taskName = event.currentTarget.task.value.trim();
    if (taskName.length === 0) {
      toastifyAdapter.warn("Digite uma tarefa!");
      return;
    }

    const newTask: TaskModelType = {
      id: Date.now().toString(),
      name: taskName,
      duration: state.config[nextCycleType],
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      type: nextCycleType,
    };

    dispatch({ type: TypeAction.START_TASK, payload: newTask });
    toastifyAdapter.success("Tarefa iniciada com sucesso!");
  };

  function handleInterruptTask() {
    toastifyAdapter.dismiss();
    toastifyAdapter.info("Tarefa interrompida.");
    dispatch({ type: TypeAction.INTERRUPT_TASK });
  }

  const tipsForEachInterval = {
    workTime: (
      <span>
        {" "}
        Se mantenha focado por <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Aproveite o descanso de <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: <span>Hora do descanso longo, aproveite!</span>,
  };

  return (
    <>
      <span className={styles.time}>{state.formattedSecondsRemaining}</span>

      <form onSubmit={handleCreateTask} className={styles.taskContainer}>
        <label id="task">task:</label>
        <Input
          disabled={!!state.activeTask}
          id="task"
          placeholder="Digite sua tarefa"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <p>{state.activeTask && tipsForEachInterval[state.activeTask.type]}</p>

        {state.currentCycle > 0 && <Cycles />}
        <Button
          type={state.activeTask ? "button" : "submit"}
          color={state.activeTask ? "red" : "green"}
          title={state.activeTask ? "Parar tarefa" : "Iniciar tarefa"}
          aria-label={state.activeTask ? "Parar tarefa" : "Iniciar tarefa"}
          onClick={state.activeTask ? handleInterruptTask : () => {}}
          key={state.activeTask ? "stop" : "play"}
        >
          {state.activeTask ? <StopCircle /> : <Play />}
        </Button>
      </form>
    </>
  );
};

export default Timer;
