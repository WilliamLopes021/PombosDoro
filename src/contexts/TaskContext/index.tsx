import { createContext } from "react";
import type { TaskContextProps } from "../../props/contexts/TaskContextProps";
import type { TaskStateModel } from "../../types/Task/TaskStateModel";

const initialState: TaskStateModel = {
  task: [],
  formattedSecondsRemaining: "00:00",
  secondsRemaining: 0,
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  setState: () => {},
});

export default TaskContext;
