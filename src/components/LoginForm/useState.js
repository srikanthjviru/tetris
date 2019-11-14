import React, { useState } from "react";
import login from "../../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // console.log(isLoggedIn, "isLoggedin");

  const Submit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login({ username, password });
      console.log("success :)");
      setError("");
      setisLoggedIn(true);
      setUsername("");
      setpassword("");
    } catch (err) {
      // error
      setIsLoading(false);
      setError("Incorrect Username or Password");
      //   console.log(":( failed");
      console.log("Error --", typeof err);
    }
    setIsLoading(false);
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
            onClick={() => setisLoggedIn(false)}
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
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            style={{ padding: 10, fontSize: 15 }}
            placeholder="Password"
            value={password}
            onChange={e => setpassword(e.target.value)}
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
};
export default Login;
