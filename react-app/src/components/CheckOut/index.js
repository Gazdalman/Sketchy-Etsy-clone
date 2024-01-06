import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { addUserOrderItems, placeOrder } from "../../store/order";
import CheckOutMessage from "./ominousMessage";
import ShippingDetails from "./shippingDetails";
// import { getCart } from "../../store/cart";

export default function CheckOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  // const cart = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    // console.log(user);
    const storedCart = localStorage.getItem(`${user.id}Cart`);
    let parsedCart = JSON.parse(storedCart);
    parsedCart = [...Object.values(parsedCart)];
    let sub = 0;
    // console.log(parsedCart);
    parsedCart.map((item) => {
      // console.log(item);
      const price = parseFloat(item.price);
      // console.log(price);
      const quantity = parseFloat(item.quantity);
      // console.log(quantity);
      item.subTotal = price * quantity;
      sub += item.subTotal;
    });
    setCart(parsedCart);
    setSubTotal(sub);
    // dispatch(getCart()).then(() => setIsLoaded(true));
    setIsLoaded(true);
  }, []);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // dispatch(placeOrder()).then(() => history.push("/home"));
  // };

  const place_Order = (e) => {
    e.preventDefault();
    let updateCart = {};
    const userId = user.id;
    dispatch(placeOrder()).then((orderId) => {
      cart.map((item) => {
        // console.log(item);
        // console.log(orderId);
        const formData = {
          orderId: orderId,
          orderTotal: subTotal.toFixed(2),
          itemId: item.id,
          quantity: item.quantity,
        };
        dispatch(addUserOrderItems({ formData }))
          .then((data) => {
            if (data && data.errors) {
              console.log(data);
            }
            // console.log(data);
          })
          .then(() => {
            localStorage.setItem(`${userId}Cart`, JSON.stringify(updateCart));
          })
          .then(() => {
            history.push("/past-order");
          });
      });
    });
    // history.push("/past-order");
  };

  return isLoaded ? (
    <>
      <h2>Check Out</h2>
      <div className="checkout-page">
        <div
          className="form-message-container"
          onClick={() => setClicked(!clicked)}
        >
          {clicked ? <CheckOutMessage /> : <ShippingDetails />}
        </div>
        {/* {isLoaded && ( */}
        <div className="checkout-card">
          {cart.map((item) => (
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <h4>{item.name}</h4>
              <p>
                {item.quantity} for ${parseFloat(item.subTotal).toFixed(2)}
              </p>
            </div>
          ))}

          <h4>Total: ${subTotal.toFixed(2)}</h4>
          {/* <button className="checkout-btn" onClick={(e) => handleClick(e)}>Confirm</button> */}
          <div className="checkout_buttons_container">
            <form onSubmit={place_Order}>
              <button className="checkout-btn" type="submit">
                Confirm
              </button>
            </form>
            <NavLink to="/cart">
              <button className="cancel-btn">Cancel</button>
            </NavLink>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
