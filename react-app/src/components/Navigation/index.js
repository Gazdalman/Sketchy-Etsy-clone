import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation()
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>

      {(isLoaded) && (
        <li>
          <ProfileButton user={sessionUser} disabled={location.pathname == '/login' || location.pathname == '/signup'}/>
        </li>
      )}
      <li>
        <NavLink to="/wishlist">
          <button>Wishlist</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart">
          <button>Cart</button>
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
