import React from "react";
import classes from "./ConfirmModal.module.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <p>{message}</p>
        <div className={classes.buttons}>
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;