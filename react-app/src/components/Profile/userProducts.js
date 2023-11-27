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
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.userProducts);

  const [isLoaded, setIsLoaded] = useState(false);

  const edit = (e, productId) => {
    e.preventDefault();
    return history.push(`/products/${productId}/edit`);
  };

  useEffect(() => {
    const userId = user.id;
    dispatch(getUserProducts(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          {Object.values(products).length > 0 ? (
            <div className="userProductsContainer">
              {Object.values(products).map((item) => (
                <div key={item.id} className="indvUserProducts">
                  <div className="userProductImages">
                    {item.preview ? (
                      <img src={item.preview} className="userIdvProductImage" />
                    ) : (
                      <>
                        <p>Product Image</p>
                        <p>Coming Soon...</p>
                      </>
                    )}
                  </div>
                  <div>
                    <a href={`/products/${item.id}`}>
                      <h4>{item.name}</h4>
                    </a>
                    <p className="userProductDescription">{item.description}</p>
                    <p className="userProductPrice">${item.price}</p>
                    <div className="userProductButtons">
                      <button
                        onClick={(e) => edit(e, item.id)}
                        id="editProductButton"
                      >
                        Edit
                      </button>
                      <OpenModalButton
                        buttonText={"Delete Product"}
                        modalComponent={
                          <DeleteProduct product={item} refresh={true} />
                        }
                        modalClasses={["deleteProductButton"]}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {currUser.id == user.id ? (
                <h3>You don't have any listed products yet.</h3>
              ) : (
                <h3>{user.username} doesn't have any listed products yet.</h3>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
