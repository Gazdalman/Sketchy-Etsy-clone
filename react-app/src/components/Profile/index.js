import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccount from "../DeleteModal/deleteModalUser";
import { getUser } from "../../store/users";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const targetUser = useSelector((state) => state.users);
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

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

          <button>New Product</button>
          {/* might move the following 2 buttons to an account setting menu */}
          <NavLink to="/editAccount">
            <button>Edit Profile</button>
          </NavLink>
          {/* Following buttons needs to render modal to confirm deletion */}
          <OpenModalButton
            modalClasses={["delete-button-container"]}
            buttonText="Delete your Account"
            modalComponent={<DeleteAccount />}
          />

          <div>
            Tabs will render here - will be rendered from another .js file and
            only when respective tab clicked
            {/*
              - tab -> pop with orders (5 at a time)
                  + button for view all orders
              - tab -> reviews authored by user
              */}
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
          <div>Products being sold by user will render here</div>
        </>
      )}
    </div>
  );
}
