import type { ButtonProps } from "../../props/components/ButtonProps";
import styles from "./Button.module.css";

const Button = ({ children, ...attributes }: ButtonProps) => {
  return <button className={styles.button} {...attributes}>{children}</button>;
};

export default Button;
