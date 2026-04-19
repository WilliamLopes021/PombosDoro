import TaskContext from "../contexts/TaskContext";
import { useContext } from "react";

const useTaskContext = () => {
  return useContext(TaskContext);
};

export default useTaskContext;
