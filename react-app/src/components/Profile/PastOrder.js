import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrders } from "../../store/order";
import { addItemToCart, updateQuantity } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const allOrders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("order state", allOrders);
  // console.log("cart", cart);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const productId = product.id;
    if (cart[productId]) {
      dispatch(updateQuantity(productId, "inc"));
    } else {
      dispatch(addItemToCart(productId));
    }
  };

  return (
    isLoaded && (
      <div className="pastOrdersBody">
        <h1>History Order</h1>
        {Object.values(allOrders).map((order) => (
          <div key={order.id} className="indvOrdersInAll">
            <h3>
              Order#:{" "}
              {Object.keys(allOrders).find((key) => allOrders[key] === order)}
            </h3>
            <p>Order Total: {order.total}</p>
            <div className="allOrdersItemsContainer">
              {order.products.map((item) => (
                <div key={item.id} className="indvUserOrderItems">
                  <div>
                    <h4>{item.name}</h4>
                    <div className="orderItemPriceQuantDiv">
                      <p># Purchased: {item.quantity}</p>
                      <p className="orderedItemPrice">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="userOrderButtons">
                      <OpenModalButton
                        buttonText="Write Review"
                        modalComponent={<ReviewFormModal productId={item.id} />}
                      />
                      <button onClick={(e) => handleClick(e)}>
                        Return Item
                      </button>
                      <button
                        value={item.id}
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
}
