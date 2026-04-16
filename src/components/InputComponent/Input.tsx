import type { InputProps } from "../../props/components/InputProps";
import styles from "./Input.module.css";

const Input = ({...args}: InputProps) => {
  return <input className={styles.input} {...args} />;
};

export default Input;
