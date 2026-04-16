import "./styles/theme.css";
import "./styles/global.css";
import Heading from "./sections/Heading/Heading.tsx";
import MainContent from "./sections/MainContent/MainContent.tsx";
// import Timer from "./sections/Timer/Timer.tsx";
import Footer from "./sections/Footer/Footer.tsx";
import History from "./sections/HistorySection/History.tsx";

const App = () => {
  return (
    <>
      <MainContent>
        <Heading />
        <History />
        <Footer />
      </MainContent>
    </>
  );
};

export default App;
