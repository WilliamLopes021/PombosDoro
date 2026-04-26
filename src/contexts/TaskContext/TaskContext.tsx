import { createContext } from "react";
import type { TaskContextProps } from "../../props/contexts/TaskContextProps";
import {initialTaskState} from './initialTaskState'

const TaskContext = createContext<TaskContextProps>({
  state: initialTaskState,
  dispatch: () => {},
});

export default TaskContext;
