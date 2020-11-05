import React from "react";
import "./style.scss";

function MainLoader() {
  return (
    <div className="main-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default MainLoader;
