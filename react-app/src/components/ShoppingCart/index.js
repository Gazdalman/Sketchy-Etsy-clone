import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCart } from "../../store/cart";


export default function Cart() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCart, setLoadedCart] = useState(Object.values(cart));

  useEffect(() => {
    if (user.id) {
      dispatch(getCart()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch]);

  // console.log(user.id);

  useEffect(() => {
    setLoadedCart(Object.values(cart));
  }, [isLoaded]);

  // ! Return to be expanded later

  return (
    <div>
      <h1>Shopping Cart</h1>
      {isLoaded &&
        loadedCart.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}
