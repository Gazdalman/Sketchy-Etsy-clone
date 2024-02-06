import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getWish } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import DeleteWish from "../DeleteModal/deleteModalWishlist";
import ConfirmAdd from "../ConfirmAddTo";
import "./Profile.css";
// import Reviews from "../ProductReviews";

export default function UserWishlist({ user }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getWish()).then(() => setIsLoaded(true));
    // if (user) {
    // }
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(wishlist);
  // }, [isLoaded]);

  return (
    <>
      {isLoaded ? (
        <>
          {wishlist &&
          wishlist != "undefined" &&
          Object.keys(wishlist).length > 0 ? (
            <div className="userWishlistContainer">
              {/* {console.log(wishlist)} */}
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
                        modalClasses={["modal-delete-button-container"]}
                        buttonText="Delete Product"
                        modalComponent={<DeleteWish product={product} />}
                      />

                      <div className="addItemToCartBtn">
                        <OpenModalButton
                          buttonText="Add to Cart"
                          modalComponent={
                            <ConfirmAdd product={product} user={user} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3> No Wishlist items to show... </h3>
              <NavLink exact to="/home">
                <button
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Add to Your Wishlist Now
                </button>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <h3>Loading Your Wishlist...</h3>
      )}
    </>
  );
}
