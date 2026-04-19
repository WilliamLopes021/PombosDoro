import type { TaskStateModel } from "../../types/Task/TaskStateModel";

export interface TaskContextProps {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}