import './LoadScreen.css'
import React from "react";

function LoadScreen() {
  return (
    <div className={"LoadSpinner"}>
      <h4 >Loading Post...</h4>
      <img src={require('../img/Spinner.png')} alt={"Loading..."}/>
    </div>
  );
}

export default LoadScreen;