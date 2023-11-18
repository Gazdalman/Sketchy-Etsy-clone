import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCart } from "../../store/cart";

export default function Cart() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCart, setLoadedCart] = useState([]);

  useEffect(() => {
    if (user.id) {
      dispatch(getCart(user.id)).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  // console.log(user.id);

  useEffect(() => {
    const cartItems = [];
    for (let idx in cart) {
      cartItems.push(cart[idx]);
    }
    setLoadedCart([...cartItems]);
  }, [isLoaded]);

  // ! Return to be expanded later

  return (
    <div>
      <h1>Shopping Cart</h1>
      {isLoaded && loadedCart.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}
