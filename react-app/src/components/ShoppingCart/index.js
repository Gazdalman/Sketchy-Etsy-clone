import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCart } from "../../store/cart";

export default function Cart() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (user.id) {
      dispatch(getCart(user.id));
    }
  }, dispatch);

  console.log(user.id);
  console.log(cart);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>testing shopping cart front end route</p>
    </div>
  );
}
