import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [creds, setCreds] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const demoUsers = ["nina", "ann", "toney", "rod", "demoUser5"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(creds, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="loginTitle">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username/Email
          <input
            className="loginInput"
            type="text"
            value={creds}
            onChange={(e) => setCreds(e.target.value)}
            required
          />
          {errors.creds && <p className="loginErrors">* {errors.creds}</p>}
          {errors.password == "No such user exists." ? (
            <p className="loginErrors">* {errors.password}</p>
          ) : null}
        </label>
        <label>
          Password
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password != undefined &&
          errors.password != "No such user exists." ? (
            <p className="loginErrors">* {errors.password}</p>
          ) : null}
        </label>
        <label>
          or Select Demo User
          <select
            className="loginSelect"
            value={creds}
            onChange={(e) => {
              setCreds(e.target.value);
              setPassword("password");
            }}
          >
            {demoUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </label>
        <button
          className="loginButton"
          type="submit"
          disabled={creds.length === 0 || password.length === 0}
        >
          Log In
        </button>
      </form>
      <NavLink className="redirectToSignUp" to="/signup">
        Or SignUp
      </NavLink>
    </div>
  );
}

export default LoginFormPage;
