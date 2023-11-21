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

  useEffect(() => {
    dispatch(getUser(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (user) {
    if (Number(user.id) === Number(userId)) {
      return (
        <div>
          <h1>
            Hello, {user.firstName} {user.lastName}
          </h1>

          <NavLink to="/new_product">
            <button>New Product</button>
          </NavLink>
          <NavLink to="/editAccount">
            <button>Edit Profile</button>
          </NavLink>
          <OpenModalButton
            modalClasses={["delete-button-container"]}
            buttonText="Delete your Account"
            modalComponent={<DeleteAccount />}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <h3
                onClick={() => {
                  setLoadProducts(true);
                  setLoadReviews(false);
                  setLoadOrders(false);
                }}
              >
                Your Products
              </h3>
              {loadProducts && <UserProducts user={user} />}
            </div>
            <div>
              <h3
                onClick={() => {
                  setLoadProducts(false);
                  setLoadReviews(true);
                  setLoadOrders(false);
                }}
              >
                Your Reviews
              </h3>
              {loadReviews && <UserReviews user={user} />}
            </div>
            <div>
              <h3
                onClick={() => {
                  setLoadProducts(false);
                  setLoadReviews(false);
                  setLoadOrders(true);
                }}
              >
                Your Orders
              </h3>
              {loadOrders && <UserOrders user={user} />}
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      {isLoaded && (
        <>
          <h1>Welcome to {targetUser.username}'s Profile</h1>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <h3
                onClick={() => {
                  setLoadProducts(true);
                  setLoadReviews(false);
                  setLoadOrders(false);
                }}
              >
                Products
              </h3>
              {loadProducts && <UserProducts user={targetUser} />}
            </div>
            <div>
              <h3
                onClick={() => {
                  setLoadProducts(false);
                  setLoadReviews(true);
                  setLoadOrders(false);
                }}
              >
                Reviews
              </h3>
              {loadReviews && <UserReviews user={targetUser} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
