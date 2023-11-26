import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews } from "../../store/review";
import { getAllUsers } from "../../store/otherUsers";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userId = user.id;
    dispatch(allYourReviews(userId))
      .then(() => dispatch(getAllUsers()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
        <>
          {Object.values(reviews).length > 0 ? (
            <div className="userReviewsContainer">
              {Object.values(reviews).map((review) => (
                <div key={review.id} className="indvUserReviews">
                  <div>
                    <h4>{products[review.product_id].name}</h4>
                    <p>{review.rating} Stars</p>
                    <p className="userProductReview">{review.review}</p>
                    <p>Author: {users[review.user_id].username}</p>
                    {!review.seller_commented && <button>Respond</button>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>You have no reviews</h3>
          )}
        </>
      )}
    </div>
  );
}
