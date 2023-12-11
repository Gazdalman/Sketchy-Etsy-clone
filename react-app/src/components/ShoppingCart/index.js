import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getCart, removeItem, updateQuantity } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import DeleteItem from "../DeleteModal/deleteModalCart";

import "./ShoppingCart.css";

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const [ payment, setPayment ] = useState("option1")

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(
    () => {
      if (!user) {
        return history.push("/login");
      }

      // dispatch(getCart()).then(() => {
      //   setIsLoaded(true);
      // });
      // let localCart = null;

      const localCart = localStorage.getItem(`${user.id}Cart`);
      console.log(localCart);
      const parsedCart = JSON.parse(localCart);
      console.log(parsedCart);
      if (localCart) {
        setCart([...Object.values(parsedCart)]);
      }
      setIsLoaded(true);
    },
    [
      /* dispatch */
    ]
  );

  const decQuant = async (item) => {
    // const change = "dec";
    // const itemId = item.id;
    // if (Number(item.quantity) === 1) {
    //   await dispatch(removeItem(itemId));
    // } else {
    //   await dispatch(updateQuantity(itemId, change));
    // }
    const message = "Functionality comming soon...";
    alert(message);
  };
  const incQuant = async (itemId) => {
    // const change = "inc";
    // await dispatch(updateQuantity(itemId, change));
    const message = "Functionality comming soon...";
    alert(message);
  };

  return cart.length ? (
    <div className="shopping-cart-page">
      <div className="shopping-cart-container">
        {isLoaded &&
          Object.values(cart).map((item) => (
            <div key={item.id} className="cart-card">
              <h3 style={{fontSize:33}}>{item.name}</h3>
              <p>$ {item.price}</p>
              <p>{item.description}</p>
              <p style={{fontSize:30}}>
                <button className="quantity-btn" onClick={() => decQuant(item)}> - </button>
                {item["quantity"]}
                <button className="quantity-btn" onClick={() => incQuant(item.id)}> + </button>
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
      </div>
        <div className="payment">
            <h2 style={{fontSize:33, color:"#322e3f"}}>How will you pay?</h2>
            <div className="radio-input-payment">
              <div className="radio-inner">
                <input
                  className="radio-btn"
                  type="radio"
                  id="op1"
                  value="option1"
                  checked={payment === "option1"}
                  onChange={onOptionChange}
                />
                <label for="op1"><i class="fa-regular fa-credit-card"></i></label>
              </div>
              <div className="radio-inner">
                <input
                  className="radio-btn"
                  type="radio"
                  id="op2"
                  value="option2"
                  checked={payment === "option2"}
                  onChange={onOptionChange}
                />
                <label for="op2"><i class="fa-solid fa-pizza-slice"></i></label>
              </div>

              <div className="radio-inner">
                <input
                  className="radio-btn"
                  type="radio"
                  id="op3"
                  value="option3"
                  checked={payment === "option3"}
                  onChange={onOptionChange}
                />
                <label for="op3"><i class="fa-solid fa-ice-cream"></i></label>
              </div>
            </div>


            <NavLink to="/home">
              <button className="payment-btn">Continue Shopping</button>
            </NavLink>
            <NavLink to="/checkout">
              <button className="payment-btn">Checkout</button>
            </NavLink>
        </div>
    </div>

  );
}
