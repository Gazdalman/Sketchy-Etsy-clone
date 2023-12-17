import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWish } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import DeleteWish from "../DeleteModal/deleteModalWishlist";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ConfirmAdd from "../ConfirmAddTo";

export default function UserWishlist({ user }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getWish()).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(wishlist);
  // }, [isLoaded]);

  return (
    <>
      {isLoaded && (
        <div className="userWishlistContainer">
          {Object.values(wishlist.products).map((product) => (
            <div key={product.id} className="indvUserWishItems">
              <div className="userProductImage">
                <>
                  {product.preview ? (
                    <img
                      src={product.preview}
                      className="userIdvProductImage"
                    />
                  ) : (
                    <>
                      <p>Product Image</p>
                      <p>Coming Soon...</p>
                    </>
                  )}
                </>
              </div>
              <div>
                <NavLink to={`/products/${product.id}`}>
                  <h4>{product.name}</h4>
                </NavLink>
                <div className="userProductPrice">{product.price}</div>
                <div className="userWishlistButtons">
                  <OpenModalButton
                    modalClasses={["delete-button-container"]}
                    buttonText="Delete Product"
                    modalComponent={<DeleteWish product={product} />}
                  />

                  <OpenModalButton
                    buttonText="Add to Cart"
                    modalComponent={
                      <ConfirmAdd product={product} user={user} />
                    }
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
