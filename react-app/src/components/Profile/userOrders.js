import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";

export default function UserOrders({ user }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(orders)
            .toReversed()
            .slice(0, 1)
            .map((order) => (
              <div
                key={Object.keys(orders).find((key) => orders[key] === order)}
              >
                <h4>
                  Order#:{" "}
                  {Object.keys(orders).find((key) => orders[key] === order)}
                </h4>
                {order.products.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <button disabled>Write Review</button>
                    <button onClick={(e) => handleClick(e)}>Return Item</button>
                  </div>
                ))}
                <p>Order Total: {order.total}</p>
                <p>Order Placed: {order.placed}</p>
                <p>Fulfilled: {order.fulfilled}</p>
              </div>
            ))}
          <div style={{ marginTop: 30 }}>
            <Link to="/past-order" style={{ textDecoration: "none" }}>
              See All Orders...
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
