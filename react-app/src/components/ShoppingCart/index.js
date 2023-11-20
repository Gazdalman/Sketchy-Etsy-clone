import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCart, removeItem, updateQuantity } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import DeleteItem from "../DeleteModal/deleteModalCart";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user.id) {
      dispatch(getCart()).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch]);

  const decQuant = (item) => {
    const change = "dec";
    const itemId = item.id;
    if (Number(item.quantity) === 1) {
      dispatch(removeItem(itemId));
    } else {
      dispatch(updateQuantity(itemId, change));
    }
  };
  const incQuant = (item) => {
    const change = "inc";
    const itemId = item.id;
    dispatch(updateQuantity(itemId, change));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {isLoaded &&
        Object.values(cart).map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>
              {item.quantity}
              <button onClick={() => decQuant(item)}> - </button>
              <button onClick={() => incQuant(item)}> + </button>
            </p>
            <>
              <OpenModalButton
                modalClasses={["delete-button-container"]}
                buttonText="Remove from Cart"
                modalComponent={<DeleteItem product={item} />}
              />
            </>
          </div>
        ))}
      <button onClick={() => history.push("/")}>Continue Shopping</button>
    </div>
  );
}
