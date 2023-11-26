import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../store/userProducts";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteModal/deleteModalProduct";
import { editAReview } from "../../store/review";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./Profile.css";

export default function UserProducts({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const products = useSelector((state) => state.userProducts);

  const [isLoaded, setIsLoaded] = useState(false);

  const edit = (e, productId) => {
    e.preventDefault()
    return history.push(`/products/${productId}/edit`)
  }

  useEffect(() => {
    const userId = user.id;
    dispatch(getUserProducts(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="userProductsContainer">
          {Object.values(products).map((item) => (
            <div key={item.id} className="indvUserProducts">
              <div className="userProductImage">
                <p>Product Image</p>
                <p>Coming Soon...</p>
              </div>
              <div>
                <a href={`/products/${item.id}`}>
                <h4>{item.name}</h4>
                <img src={item.preview} />
                </a>
                <p className="userProductDescription">{item.description}</p>
                <p className="userProductPrice">${item.price}</p>
                <div className="userProductButtons">
                  <button disabled>Edit</button>
                  <OpenModalButton
                    modalClasses={["delete-button-container"]}
                    buttonText="Delete Product"
                    modalComponent={<DeleteProduct />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
