import React from "react";

const Alert = (props) => {
  return (
    <div id="alert" className={`alert-${props.alert.type}`}>
      {props.alert.text}
    </div>
  );
};

export default Alert;
