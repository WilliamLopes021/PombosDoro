import type { TaskActionModel } from "../../contexts/TaskContext/taskActions";
import type { TaskStateModel } from "../../types/Task/TaskStateModel";

export interface TaskContextProps {
  state: TaskStateModel;
  dispatch: React.ActionDispatch<[action: TaskActionModel]>;
}



