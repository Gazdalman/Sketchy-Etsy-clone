import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";





function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation()
  return (
    <div className="nav-main-container">
      <div className="nav-sub-container1">
        <NavLink className="nav-link"  to="/home">
            <i className="fa-solid fa-skull nav-btn"
              style={{fontSize:50, cursor: "pointer", marginLeft:50, marginTop:50}}
            >
          </i>
        </NavLink>
        <div className="category">
          <button>Categories</button>

        </div>
      </div>

        <div className="nav-sub-container">

              <NavLink className="nav-link" to="/wishlist">
                <div
                  style={{fontSize: 30}}
                  className="nav-btn">
                  <i className="fa-solid fa-heart"></i>
                </div>
              </NavLink>


              <NavLink className="nav-link" to="/cart">
                <div
                  style={{fontSize: 30, cursor: "pointer"}}
                  className="nav-btn">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
              </NavLink>

            {(isLoaded) && (

              <ProfileButton user={sessionUser}
              disabled={location.pathname == '/login' || location.pathname == '/signup'}/>

            )}
        </div>

    </div>
  );
}

export default Navigation;
