import { useState } from "react";
import TaskContext from "../contexts/TaskContext";
import type { TaskContextProviderProps } from "../props/providers/TaskContextProviderProps";

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  
  const [state, setState] = useState({
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
  });

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
