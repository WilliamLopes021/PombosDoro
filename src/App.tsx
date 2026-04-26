import "./styles/theme.css";
import "./styles/global.css";
import TaskContextProvider from "./contexts/TaskContext/TaskContextProvider.tsx";
import MessageContainer from "./components/MessageContainer/MessageContainer.tsx";
import { MainRouter } from "./routers/MainRouter/MainRouter.tsx";

const App = () => {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <MainRouter />
      </MessageContainer>
    </TaskContextProvider>
  );
};

export default App;
