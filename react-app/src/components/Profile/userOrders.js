import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";

export default function UserOrders({ user }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.innerText = "No...";
    e.target.style.color = "red";
    if (e.target.innerText == "No...") {
      // ! PopUp w/ message => "You don't even know how we got it to you, how do you think you're going to return it -.- "
    }
  };

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(products).map((item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button disabled>Write Review</button>
              <button onClick={(e) => handleClick(e)}>Return Item</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
