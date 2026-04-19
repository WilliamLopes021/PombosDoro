import type { MainTemplateProps } from "../../props/templates/MainTemplateProps";
import MainContent from "../../sections/MainContent/MainContent.tsx";
import Heading from "../../sections/Heading/Heading.tsx";
import Footer from "../../sections/Footer/Footer.tsx";

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <MainContent>
        <Heading />
        {children}
        <Footer />
      </MainContent>
    </>
  );
};

export default MainTemplate;
