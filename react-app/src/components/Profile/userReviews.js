import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    // ! dispatch for user's products
    console.log(user);
  }, [dispatch]);

  // ! if current_user == user.id display 2 tabs (your reviews, reviews on your products) else == reviews on user products

  // * for current_user authored reviews => button "Comment on Review"
  return <h4>Coming Soon...</h4>;
}
