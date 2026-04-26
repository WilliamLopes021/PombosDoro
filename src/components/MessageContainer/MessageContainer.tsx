import type { MessageContainerProps } from "../../props/components/MessageContainerProps";
import { Bounce, ToastContainer } from "react-toastify";

const MessageContainer = ({ children }: MessageContainerProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default MessageContainer;
