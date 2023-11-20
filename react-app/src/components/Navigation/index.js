import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/new_product">
          Create Spot
        </NavLink>
      </li>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {sessionUser && (
        <>
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
        </>
      )}
    </ul>
  );
}

export default Navigation;
