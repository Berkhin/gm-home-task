import React, { ReactNode } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        isActive
          ? `${classes.Button} ${classes.active}`
          : `${classes.Button} ${classes.disabled}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
