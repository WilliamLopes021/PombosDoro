import "./styles/theme.css";
import "./styles/global.css";
import Home from "./pages/Home/index.tsx";
import TaskContextProvider from "./providers/TaskContextProvider.tsx";

const App = () => {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
};

export default App;
