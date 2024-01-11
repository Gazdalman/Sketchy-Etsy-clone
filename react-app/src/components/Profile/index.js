import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccount from "../DeleteModal/deleteModalUser";
import { getUser } from "../../store/users";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import UserOrders from "./userOrders";
import UserProducts from "./userProducts";
import UserReviews from "./userReviews";
import UserWishlist from "./userWishlist";
import "./Profile.css";

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const targetUser = useSelector((state) => state.users);

  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProducts, setLoadProducts] = useState(true);
  const [loadReviews, setLoadReviews] = useState(false);
  const [loadOrders, setLoadOrders] = useState(false);
  const [loadWishlist, setLoadWishlist] = useState(false);

  useEffect(() => {
    if (!user) {
      return history.push("/");
    } else {
      dispatch(getUser(userId)).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  if (isLoaded && user && Number(user.id) === Number(userId)) {
    return (
      <div className="profileContainer">
        <h1>
          Hello, {user.firstName} {user.lastName}
        </h1>
        <div className="profileButtonContainer">
          <NavLink to="/new_product">
            <button className="proNewProdBtn">List New Product</button>
          </NavLink>
          <NavLink to="/editAccount">
            <button className="editProfileBtn">Edit Profile</button>
          </NavLink>
          <OpenModalButton
            modalClasses={["delAcountButton"]}
            buttonText="Delete your Account"
            modalComponent={<DeleteAccount />}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <div>
            <h3
              className="profileTab"
              id={loadProducts ? "selected" : null}
              onClick={() => {
                setLoadProducts(true);
                setLoadReviews(false);
                setLoadOrders(false);
                setLoadWishlist(false);
              }}
            >
              Your Products
            </h3>
          </div>
          <div>
            <h3
              className="profileTab"
              id={loadReviews ? "selected" : null}
              onClick={() => {
                setLoadProducts(false);
                setLoadReviews(true);
                setLoadOrders(false);
                setLoadWishlist(false);
              }}
            >
              Your Reviews
            </h3>
          </div>
          <div>
            <h3
              className="profileTab"
              id={loadOrders ? "selected" : null}
              onClick={() => {
                setLoadProducts(false);
                setLoadReviews(false);
                setLoadOrders(true);
                setLoadWishlist(false);
              }}
            >
              Your Orders
            </h3>
          </div>
          <div>
            <h3
              className="profileTab"
              id={loadWishlist ? "selected" : null}
              onClick={() => {
                setLoadProducts(false);
                setLoadReviews(false);
                setLoadOrders(false);
                setLoadWishlist(true);
              }}
            >
              Your Wishlist
            </h3>
          </div>
        </div>
        <div className="profileTabDisplay">
          {loadProducts && <UserProducts user={user} />}
          {loadReviews && <UserReviews user={user} />}
          {loadOrders && <UserOrders user={user} />}
          {loadWishlist && <UserWishlist user={user} />}
        </div>
      </div>
    );
  }

  return (
    <div>
      {isLoaded && (
        <div>
          <h1>Welcome to {targetUser.username}'s Profile</h1>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <h3
                className="profileTab"
                id={loadProducts ? "selected" : null}
                onClick={() => {
                  setLoadProducts(true);
                  setLoadReviews(false);
                  setLoadOrders(false);
                }}
              >
                Products
              </h3>
            </div>
            <div>
              <h3
                className="profileTab"
                id={loadReviews ? "selected" : null}
                onClick={() => {
                  setLoadProducts(false);
                  setLoadReviews(true);
                  setLoadOrders(false);
                }}
              >
                Reviews
              </h3>
            </div>
          </div>
          <div className="profileTabDisplay">
            {loadProducts && <UserProducts user={targetUser} />}
            {loadReviews && <UserReviews user={targetUser} />}
          </div>
        </div>
      )}
    </div>
  );
}
