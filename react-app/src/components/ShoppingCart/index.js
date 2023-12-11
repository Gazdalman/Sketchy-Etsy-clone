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
  //const cart = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("option1");
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      return history.push("/login");
    }

    const localCart = localStorage.getItem(`${user.id}Cart`);
    // console.log(localCart);
    const parsedCart = JSON.parse(localCart);
    // console.log(parsedCart);
    if (localCart) {
      setCart([...Object.values(parsedCart)]);
    }
    setIsLoaded(true);
  }, []);

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
          cart.map((item) => (
            <div key={item.id} className="cart-card">
              {/* {console.log(cart)} */}
              <img
                src={item.preview}
                alt="item preview"
                className="productImageCart"
              />
              <div className="cartProd_nameNpricediv">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="cartProd_description">{item.description}</div>
              <div className="cartProd_quantityChangeContainer">
                <p>{item.quantity}</p>
                <div className="cartProd_quantityButtonsContainer">
                  <button
                    className="quantity-btn"
                    onClick={(e) => changeQuant(e, "dec", item.id)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <button
                    className="quantity-btn"
                    onClick={(e) => changeQuant(e, "inc", item.id)}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <>
                {/* <OpenModalButton
                  modalClasses={["delete-button-container"]}
                  buttonText="Remove from Cart"
                  modalComponent={<DeleteItem product={item} />}
                /> */}
                <button
                  className="delete-button-container"
                  id="removeFromCart"
                  onClick={(e) => removeFromCart(e, item.id)}
                >
                  Remove from Cart
                </button>
              </>
            </div>
          ))}
      </div>
      {cart.length && (
        <div className="payment">
          <h2>How will you pay?</h2>
          <div className="radio-inner">
            <div className="radio-input-payment">
              <input
                className="radio-btn"
                type="radio"
                id="op1"
                value="option1"
                checked={payment === "option1"}
                onChange={onOptionChange}
              />
              <label for="op1">
                <i class="fa-regular fa-credit-card"></i>
              </label>
            </div>
            <div className="radio-input-payment">
              <input
                className="radio-btn"
                type="radio"
                id="op2"
                value="option2"
                checked={payment === "option2"}
                onChange={onOptionChange}
              />
              <label for="op2">
                <i class="fa-solid fa-pizza-slice"></i>
              </label>
            </div>

            <div className="radio-input-payment">
              <input
                className="radio-btn"
                type="radio"
                id="op3"
                value="option3"
                checked={payment === "option3"}
                onChange={onOptionChange}
              />
              <label for="op3">
                <i class="fa-solid fa-ice-cream"></i>
              </label>
            </div>
          </div>
          <div className="cart-btns-container">
            <NavLink to="/home">
              <button className="payment-btn">Continue Shopping</button>
            </NavLink>
            <NavLink to="/checkout">
              <button className="payment-btn">Checkout</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <h1> Nothing in your cart </h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/home");
        }}
      >
        Shop Now!
      </button>
    </div>

  );
}
