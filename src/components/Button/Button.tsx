import type { ButtonProps } from "../../props/components/ButtonProps";
import styles from "./Button.module.css";

const Button = ({ color = 'green', children, ...attributes }: ButtonProps) => {
  return <button className={`${styles.button} ${styles[color]}`} {...attributes}>{children}</button>;
};

export default Button;
