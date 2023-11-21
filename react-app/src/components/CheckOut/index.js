import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function CheckOut() {
  const cart = useSelector((state) => state.cart);
  let subtotal = 0;

  Object.values(cart).map((item) => {
    subtotal += parseFloat(item.price * item.quantity);
  });

  return (
    <div>
      <h2>Check Out</h2>
      {Object.values(cart).map((item) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <h4>{item.name}</h4>
          <p>{parseFloat(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h4>Total: {subtotal.toFixed(2)}</h4>
      <button>Confirm</button>
      <NavLink to="/cart">
        <button>Cancel</button>
      </NavLink>
    </div>
  );
}
