import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { editUser } from "../../store/session";
import "./EditAccountPage.css";

export default function EditAccountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  //   const [old_password, setOldPassword] = useState("");
  //   const [new_password, setNewPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (!user) {
    return history.push("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.id, firstName, lastName, email);
    dispatch(editUser(user.id, firstName, lastName, email));
  };

  return (
    <>
      <h1>Edit Account</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* <label>
          Password
          <input
            type="password"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label> */}
        <button type="submit">Save</button>
      </form>
      <NavLink to={`/profile/${user.id}`}>
        <button>Cancel</button>
      </NavLink>
    </>
  );
}
