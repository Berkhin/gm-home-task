import { createPortal } from "react-dom";
import classes from "./Modal.module.scss";
import { FC, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  visible: boolean;
  onCloseClick: () => void;
}

const Modal: FC<ModalProps> = ({ children, visible, onCloseClick }) => {
  if (!visible) {
    return null;
  }

  return createPortal(
    <>
      <div className={classes.overlayStyles} onClick={onCloseClick} />
      <div className={classes.modalStyles}>
        {children}
      </div>
    </>,
    document.body
  );
};

export default Modal;
