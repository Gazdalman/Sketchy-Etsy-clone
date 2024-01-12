import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/otherUsers";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const userId = user.id;
    dispatch(getAllUsers())
      .then(() => {
        let revArr = [];
        Object.values(products).map((product) => {
          Object.values(product.reviews).map((prodRev) => {
            if (product.seller_id == user.id) {
              revArr.push(prodRev);
            }
          });
        });
        setReviews(revArr);
      })
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
        <>
          {reviews.length > 0 ? (
            <div className="userReviewsContainer">
              {reviews.map((review) => (
                <div key={review.id} className="indvUserReviews">
                  <div>
                    <NavLink to={`/products/${review.product_id}`}>
                      <h4>{products[review.product_id].name}</h4>
                    </NavLink>
                    <p>{review.rating} Stars</p>
                    <p className="userProductReview">{review.review}</p>
                    <NavLink to={`/profile/${review.user_id}`}>
                      <p>Author: {users[review.user_id].username}</p>
                    </NavLink>
                    {/* {!review.seller_commented &&
                      currUser &&
                      currUser.id == user.id && (
                        <button style={{ width: "100%" }} disabled>
                          Respond
                        </button>
                      )} */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>You have no reviews yet</h3>
          )}
        </>
      )}
    </div>
  );
}
