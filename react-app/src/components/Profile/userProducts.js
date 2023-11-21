import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/userProducts";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteModal/deleteModalProduct";

export default function UserProducts({ user }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.userProducts);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userId = user.id;
    dispatch(getUserProducts(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(products).map((item) => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button disabled>Edit</button>
              <OpenModalButton
                modalClasses={["delete-button-container"]}
                buttonText="Delete Product"
                modalComponent={<DeleteProduct />}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
