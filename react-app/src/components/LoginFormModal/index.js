import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(creds, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="logInModal">
      <h1>Log In</h1>
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
        <button className="loginButton" type="submit">
          Log In
        </button>
      </form>

      <OpenModalButton
        modalClasses={["logInRedirect"]}
        modalComponent={<SignupFormModal />}
        buttonText="... or Sign Up Here"
      />
    </div>
  );
}

export default LoginFormModal;
