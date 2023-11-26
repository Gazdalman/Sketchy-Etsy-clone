import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";





function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (

    <nav className="nav-main-container">

            <NavLink className="nav-link"  to="/home">
               <i className="fa-solid fa-skull nav-btn"
                  style={{fontSize:70, cursor: "pointer", marginLeft:50, marginTop:50}}
                >
              </i>
            </NavLink>

        <div className="nav-sub-container">
            <li>
              <NavLink className="nav-link" to="/wishlist">
                <div
                  style={{fontSize: 40}}
                  className="nav-btn">
                  <i className="fa-solid fa-heart"></i>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/cart">
                <div
                  style={{fontSize: 40, cursor: "pointer"}}
                  className="nav-btn">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
              </NavLink>
            </li>
            {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
            )}
        </div>

    </nav>
  );
}

export default Navigation;
