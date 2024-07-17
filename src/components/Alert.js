import React from "react";

const Alert = (props) => {
  const changeType = (word) => {
    if (props.alert.type === "Danger"){
      return "Error" ;
    }
    else return word ;
  }
  return (
    <div style={{height:"50px"}}>
    {props.alert && (
      <div
        className={`alert alert-${props.alert.type.toLowerCase()} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{changeType(props.alert.type)}</strong> : {props.alert.message}
      </div>
    )}
    </div>
  );
};

export default Alert;
