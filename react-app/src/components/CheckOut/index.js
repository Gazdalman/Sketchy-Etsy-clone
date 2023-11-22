import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { placeOrder } from "../../store/order";
import CheckOutMessage from "./ominousMessage";
import ShippingDetails from "./shippingDetails";
import { getCart } from "../../store/cart";

export default function CheckOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  let subtotal = 0;

  useEffect(() => {
    dispatch(getCart()).then(() => setIsLoaded(true));
  }, [dispatch]);

  Object.values(cart).map((item) => {
    return subtotal += parseFloat(item.price * item.quantity);
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(placeOrder()).then(() => history.push("/"));
  };

  // * Will need to override input & label styling later

  return (
    <div>
      <h2>Check Out</h2>
      <div onClick={() => setClicked(!clicked)}>
        {clicked ? <CheckOutMessage /> : <ShippingDetails />}
      </div>
      {isLoaded && (
        <>
          {Object.values(cart).map((item) => (
            <div style={{ display: "flex", gap: "15px" }}>
              <h4>{item.name}</h4>
              <p>{parseFloat(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h4>Total: {subtotal.toFixed(2)}</h4>
          <button onClick={(e) => handleClick(e)}>Confirm</button>
          <NavLink to="/cart">
            <button>Cancel</button>
          </NavLink>
        </>
      )}
    </div>
  );
}
