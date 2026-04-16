import type { MainContentProps } from "../../props/sections/MainContentProps";
import styles from "./MainContent.module.css";

const MainContent = ({ children }: MainContentProps) => {
  return <main className={styles.mainContent}>{children}</main>;
};

export default MainContent;
