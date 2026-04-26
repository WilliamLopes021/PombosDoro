import TaskContext from "./TaskContext";
import { useContext } from "react";

const useTaskContext = () => {
  return useContext(TaskContext);
};

export default useTaskContext;
