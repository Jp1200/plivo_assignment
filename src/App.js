import React from "react";
import Message from "./MessageApi.js";
import "./App.css";

function App() {
  return (
    <div className="App-module">
      <div className="img">
        <img src={require("./assestImgs/imgPhone.svg")} alt="undraw" />
        <Message />
      </div>
    </div>
  );
}

export default App;
