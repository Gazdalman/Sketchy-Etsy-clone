import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { placeOrder } from "../../store/order";

export default function CheckOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  let subtotal = 0;

  Object.values(cart).map((item) => {
    return subtotal += parseFloat(item.price * item.quantity);
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(placeOrder()).then(() => history.push("/"));
  };

  // * Will need to override input & label styling later

  // ! Orders route connected does not YET clear cart (nor does it add to user orders :/ )

  return (
    <div>
      <h2>Check Out</h2>
      <label>
        {" "}
        Name on Card:
        <input type="text" disabled></input>
      </label>
      <label>
        {" "}
        Card Number
        <input type="text" disabled></input>
      </label>
      <label>
        {" "}
        CVV:
        <input type="text" disabled></input>
      </label>
      <label>
        {" "}
        Expiration Date:
        <input type="month" min={Date.now()} disabled></input>
      </label>
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
    </div>
  );
}
