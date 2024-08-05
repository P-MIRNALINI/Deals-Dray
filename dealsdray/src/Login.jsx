// Login.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          username,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            navigate("/home"); // Navigate to Home component
          } else if (res.data === "notexist") {
            alert("User has not signed up");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit}>
          Submit
        </button>
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
