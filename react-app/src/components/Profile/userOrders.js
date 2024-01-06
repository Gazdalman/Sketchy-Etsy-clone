import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";
import { addItemToCart, updateQuantity } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import ConfirmAdd from "../ConfirmAddTo";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function UserOrders({ user }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("orders Arr", Object.values(orders));

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.innerText == "No...") {
      const message =
        "You don't even know how your packages are appearing in your house, how do you think you're going to return them if we did give you the option? 🤣";
      alert(message);
    }
    e.target.innerText = "No...";
    e.target.style.color = "red";
  };

  // const handleAddToCart = (e, product) => {
  //   e.preventDefault();
  //   const productId = product.id;
  //   if (cart[productId]) {
  //     dispatch(updateQuantity(productId, "inc"));
  //   } else {
  //     dispatch(addItemToCart(productId));
  //   }
  //   alert("Item added to your shopping cart! 😊");
  // };

  return isLoaded ? (
    <div className="userOrdersContainer">
      {Object.values(orders)
        .toReversed()
        .slice(0, 1)
        .map((order) => (
          <div key={order.id}>
            <h3>
              Order#: {Object.keys(orders).find((key) => orders[key] === order)}
            </h3>
            <p>Order Total: {order.total}</p>
            <div className="userOrderItemsContainer">
              {order.products.map((item) => (
                <div
                  key={item.id}
                  className="indvUserOrderItems"
                  id={order.products.length > 2 ? "scroll" : ""}
                >
                  {console.log(order.products.length)}
                  <div>
                    <NavLink to={`/products/${item.id}`}>
                      <h4>{item.name}</h4>
                    </NavLink>
                    <div className="orderItemPriceQuantDiv">
                      {/* <p># Purchased: {item.quantity}</p> */}
                      <p className="orderedItemPrice">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="userOrderButtons">
                      <OpenModalButton
                        modalClasses={["ordersWriteReview"]}
                        buttonText="Write Review"
                        modalComponent={<ReviewFormModal productId={item.id} />}
                      />
                      <button
                        className="ordersReturnItemBtn"
                        onClick={(e) => handleClick(e)}
                      >
                        Return Item
                      </button>
                      {/* <button
                        className="ordersAddToCartBtn"
                        value={item.id}
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        Buy Again
                      </button> */}
                      <div className="ordersAddToCartBtn">
                        <OpenModalButton
                          buttonText="Buy Again"
                          modalComponent={
                            <ConfirmAdd product={item} user={user} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      <div style={{ marginTop: 30 }}>
        <div>
          <Link
            to="/past-order"
            style={{
              textDecoration: "none",
              color: "rgb(29, 51, 57)",
              fontWeight: "bold",
            }}
          >
            See All Orders...
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}
