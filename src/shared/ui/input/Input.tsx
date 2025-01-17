import React from "react";
import classes from "./Input.module.css";

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        className={classes.input}
        {...props}
      />
    );
  }
);

export default MyInput;