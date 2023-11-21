import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews } from "../../store/review";
import { getAllUsers } from "../../store/otherUsers";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers.users);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userId = user.id;
    dispatch(allYourReviews(userId))
      .then(() => dispatch(getAllUsers()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("reiews => ", reviews);
  //   console.log("products => ", products);
  //   console.log("users => ", users);
  // }, [isLoaded]);

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(reviews).map((review) => (
            <div key={review.id}>
              <h4>{products[review.product_id].name}</h4>
              <p>{review.rating} Stars</p>
              <p>{review.review}</p>
              <p>Author: {users[review.user_id].username}</p>
              {!review.seller_commented && <button>Respond</button>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
