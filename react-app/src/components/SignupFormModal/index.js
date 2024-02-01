import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

function SignupFormModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signUpModal">
      <h1 className="signUpTitle">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name*
          <input
            className="signUpInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <p className="signUpErrors">* {errors.firstName}</p>
          )}
        </label>
        <label>
          Last Name
          <input
            className="signUpInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <p className="signUpErrors">* {errors.lastName}</p>
          )}
        </label>
        <label>
          Email
          <input
            className="signUpInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="signUpErrors">* {errors.email}</p>}
        </label>
        <label>
          Username
          <input
            className="signUpInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p className="signUpErrors">* {errors.username}</p>
          )}
        </label>
        <label>
          Password
          <input
            className="signUpInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            className="signUpInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="signUpButton"
          type="submit"
          disabled={password.length < 6 || password != confirmPassword}
        >
          Sign Up
        </button>
      </form>

      <span>
        Have an account?{" "}
        <OpenModalButton
          modalClasses={["signUpRedirect"]}
          modalComponent={<LoginFormModal />}
          buttonText="Log In Here"
        />
      </span>
    </div>
  );
}

export default SignupFormModal;
