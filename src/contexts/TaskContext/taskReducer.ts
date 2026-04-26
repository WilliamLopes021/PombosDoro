import { TypeAction, type TaskActionModel } from "./taskActions";
import type { TaskStateModel } from "../../types/Task/TaskStateModel";
import { getNextCycle } from "../../utils/getNextCycle";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TypeAction.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        config: { ...state.config },
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        task: [...state.task, newTask],
      };
    }

    case TypeAction.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: `00:00`,
        task: state.task.map((task) => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case TypeAction.COUNTDOWN: {
      const { secondsRemaining } = action.payload;
      const formattedSecondsRemaining =
        formatSecondsToMinutes(secondsRemaining);

      return {
        ...state,
        secondsRemaining,
        formattedSecondsRemaining,
      };
    }

    case "RESET_TASK":
      return { ...state, activeTask: null };

    case "COMPLETE_TASK": {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: `00:00`,
        task: state.task.map((task) => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }

    default:
      return state;
  }
}
