import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";

export default function UserOrders({ user }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('orders Arr', Object.values(orders))

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.innerText = "No...";
    e.target.style.color = "red";
    if (e.target.innerText == "No...") {
      // * PopUp w/ message => "You don't even know how we got it to you, how do you think you're going to return it -.- "
    }
  };

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(orders).toReversed().slice(0, 1).map((order) => (
            <div key={order.id}>
              {order.products.map((item) => (
                <div key={item.id}>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                  <button disabled>Write Review</button>
                  <button onClick={(e) => handleClick(e)}>Return Item</button>
                  <button disabled>Buy Again</button>
                </div>
              ))}
            </div>
          ))}
          <div style={{marginTop: 30}}>
                <Link
                to="/past-order"
                style={{ textDecoration: 'none'}}>

                See All Orders...
                </Link>
            </div>
        </div>
      )}
    </>
  );

}
