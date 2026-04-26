import type { TaskStateModel } from "../../types/Task/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  task: [],
  formattedSecondsRemaining: "00:00",
  secondsRemaining: 0,
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 0.5,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
