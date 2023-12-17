import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const handleClick = (e) => {
  e.preventDefault();
  alert("Feature Coming Soon!");
};

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();
  return (
    <div className="nav-main-container">
      <div className="nav-sub-container-logo">
        <NavLink className="nav-link" to="/home">
          <div style={{ fontSize: 50, cursor: "pointer" }} className="nav-btn">
            <i className="fa-solid fa-skull "></i>
          </div>
        </NavLink>

        <div className="category">
          <div onClick={(e) => handleClick(e)}>
            Categories <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <div onClick={(e) => handleClick(e)}>
          Search <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      <div className="nav-sub-container">
        <NavLink className="nav-link" to="/wishlist">
          <div style={{ fontSize: 33 }} className="nav-btn">
            <i className="fa-solid fa-heart"></i>
          </div>
        </NavLink>

        <NavLink className="nav-link" to="/cart">
          <div style={{ fontSize: 33, cursor: "pointer" }} className="nav-btn">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </NavLink>

        {isLoaded &&
          location.pathname != "/login" &&
          location.pathname != "/signup" && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
      </div>
    </div>
  );
}

export default Navigation;
