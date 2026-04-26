import { useEffect, useReducer, useRef } from "react";
import TaskContext from "./TaskContext";
import type { TaskContextProviderProps } from "../../props/providers/TaskContextProviderProps";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TypeAction } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playAudioRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
    if (countDownSeconds <= 0) {
      if (playAudioRef.current) {
        playAudioRef.current();
      } else {
        playAudioRef.current = null;
      }
      dispatch({
        type: TypeAction.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        payload: { secondsRemaining: countDownSeconds },
        type: TypeAction.COUNTDOWN,
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && !playAudioRef.current) {
      playAudioRef.current = loadBeep();
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
