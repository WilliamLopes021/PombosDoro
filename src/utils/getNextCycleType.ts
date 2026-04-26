import type { TaskModelType } from "../types/Task/TaskModelType";

export function getNextCycleType(currentCycle: number): TaskModelType["type"] {
  if (currentCycle === 8) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}
