import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccount from "../DeleteModal/deleteModalUser";

/*
- ? optional adds to model as well:
    phone#
    bio

- if userId in url == current_user.get_id() - display all
- else display bare min
*/

export default function Profile() {
  const user = useSelector((state) => state.session.user);
  const { userId } = useParams();

  if (Number(user.id) === Number(userId)) {
    return (
      <div>
        <h1>
          Hello, {user.firstName} {user.lastName}
        </h1>

        <button>New Product</button>
        {/* might move the following 2 buttons to an account setting menu */}
        <button>Edit Profile</button>
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
  return (
    <div>
      <h1>
        Welcome to {user.firstName} {user.lastName}'s Profile
      </h1>
      <div>Products being sold by user will render here</div>
    </div>
  );
}
