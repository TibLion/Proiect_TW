import React from "react";

function Popup(props) {
  if (props.status === true)
    return (
      <div className="popup popup--succes">
        {props.message}
        <span className=" popup__icon icon-checkmark"></span>
      </div>
    );
  else
    return (
      <div className="popup popup--error">
        {props.message}
        <span className="popup__icon icon-cross"></span>
      </div>
    );
}

export default Popup;
