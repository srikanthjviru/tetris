import React, { useState, useReducer } from "react";
import login from "../../utils";

function loginReducer(state, action) {
  //   console.log("state", state);
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload
      };
    }
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case "success": {
      return {
        ...state,
        error: "",
        isLoggedIn: true,
        isLoading: false,
        username: "",
        password: ""
      };
    }
    case "failed": {
      return {
        ...state,
        error: action.msg,
        isLoading: false
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    default:
      return state;
  }
}
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false
};

function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const Submit = async e => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      //sucess
      dispatch({ type: "success" });
    } catch (err) {
      // error
      dispatch({ type: "failed", msg: "Incorrect Username or Password" });
      console.log("Error --", typeof err);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          <p style={{ color: "green", fontSize: 18, fontWeight: "bold" }}>
            Hello Srikanth Welcome
          </p>
          <button
            type="buttton"
            style={{ padding: 10, fontSize: 20 }}
            // onClick={() => setisLoggedIn(false)}
            onClick={() => dispatch({ type: "logout" })}
          >
            Logout
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={Submit}>
          {isLoggedIn ? (
            "Success"
          ) : (
            <p style={{ color: "grey", fontSize: 18, fontWeight: "bold" }}>
              Please signin
            </p>
          )}
          {error && (
            <p style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              {error}
            </p>
          )}
          <input
            type="text"
            style={{ padding: 10, fontSize: 15 }}
            placeholder="Username"
            value={username}
            // onChange={e => setUsername(e.target.value)}
            onChange={e =>
              dispatch({
                type: "field",
                fieldName: "username",
                payload: e.currentTarget.value
              })
            }
          />
          <input
            type="password"
            style={{ padding: 10, fontSize: 15 }}
            placeholder="Password"
            value={password}
            // onChange={e => setpassword(e.target.value)}
            onChange={e =>
              dispatch({
                type: "field",
                fieldName: "password",
                payload: e.currentTarget.value
              })
            }
          />
          <button
            type="buttton"
            style={{ padding: 10, fontSize: 20 }}
            disabled={isLoading}
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}
export default Login;
