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

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(products).map((item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button disabled>Write Review</button>
              <button disabled>Return Item</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
