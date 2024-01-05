import React from "react";
// This is same component from text util react app

export default function Alert(props) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  };

  return (
    <div style={{ height: 50 }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)} : </strong> {props.alert.msg}
        </div>
      )}
    </div>
  );
}
