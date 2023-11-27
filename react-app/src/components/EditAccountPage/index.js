import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { editUser } from "../../store/session";
import "./EditAccountPage.css";

export default function EditAccountPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  if (!user) {
    history.push("/login");
  }

  const [firstName, setFirstName] = useState(user ? user.firstName : null);
  const [lastName, setLastName] = useState(user ? user.lastName : null);
  const [email, setEmail] = useState(user ? user.email : null);
  //   const [old_password, setOldPassword] = useState("");
  //   const [new_password, setNewPassword] = useState("");
  // const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editUser(user.id, firstName, lastName, email)).then(() =>
      history.push(`/profile/${user.id}`)
    );
  };

  return (
    <>
      {user && (
        <div className="editAccountFormContainer">
          <h1>Edit Account</h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name
              <input
                className="editAcctInput"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {/* revieving of errors need adding */}
            </label>
            <label>
              Last Name
              <input
                className="editAcctInput"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                className="editAcctInput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* revieving of errors need adding */}
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
            <div className="editAcctButtonsContainer">
              <button id="editButton" type="submit">
                Save
              </button>
              <NavLink to={`/profile/${user.id}`}>
                <button id="editButton">Cancel</button>
              </NavLink>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
