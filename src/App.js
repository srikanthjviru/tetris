import React, { useState } from "react";
import "./App.css";
import Tetris from "./components/Tetris";
import LoginForm from "./components/LoginForm/useContext";

const App = () => {
  const [boolean, setBoolean] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            width: 300,
            // padding: 10,
            alignSelf: "center",
            backgroundColor: "grey",
            color: "white",
            fontSize: 18,
            fontWeight: "bold"
          }}
          onClick={() => setBoolean(!boolean)}
        >
          <p>Switch to {boolean ? "LoginForm" : " Tetris Game :)"}</p>
        </button>
      </div>
      {boolean ? <Tetris /> : <LoginForm />}
    </div>
  );
};
export default App;
