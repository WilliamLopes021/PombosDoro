import type { TaskModelType } from "./TaskModelType";

export type TaskStateModel = {
  task: TaskModelType[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModelType | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
