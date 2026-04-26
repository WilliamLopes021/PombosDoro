import type { TaskModelType } from "../../types/Task/TaskModelType";

export enum TypeAction {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  RESET_TASK = "RESET_TASK",
  COUNTDOWN = "COUNTDOWN",
  COMPLETE_TASK = "COMPLETE_TASK",
}

export type TaskActionModel =
  | {
      type: TypeAction.START_TASK;
      payload: TaskModelType;
    }
  | {
      type: TypeAction.COUNTDOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TypeAction.INTERRUPT_TASK;
    }
  | {
      type: TypeAction.RESET_TASK;
    }
  | {
      type: TypeAction.COMPLETE_TASK;
    };
