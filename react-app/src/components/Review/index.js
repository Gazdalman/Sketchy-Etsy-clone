import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allTheReviews } from "../../store/reviews";

function Reviews({ Reviews }) {
  const dispatch = useDispatch();
  //   const [stars, setStars] = useState(0);
  const [activeRating, setActiveRating] = useState(0);

  //   function checkLength() {
  if (Reviews.length < 1) setActiveRating = 0;
  if ((Reviews.length = 1)) setActiveRating = Reviews[0].rating;
  if (Reviews.length > 1) {
    const reviewsLength = Reviews.length;
    const reviewsSum = Reviews.reduce((sum, review) => sum + review.rating, 0);
    setActiveRating = reviewsSum / reviewsLength;
  }
  //   }

  useEffect(() => {
    dispatch(allTheReviews(spotId));
  }, [dispatch, spotId]);
  return (
    <>
      <p>
        {reviewsLength == 1 ? (
          <h1>{reviewsLength} Reviews</h1>
        ) : (
          <h1>{reviewsLength} Reviews</h1>
        )}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <div
              class="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <i
                className={
                  activeRating >= 1 || activeRating > 1
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  activeRating >= 2 || activeRating > 2
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  activeRating >= 3 || activeRating > 3
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  activeRating >= 4 || activeRating > 3
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  activeRating >= 5 || activeRating > 4
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
            </div>
          </label>
        </div>
      </p>
      <div>
        {Reviews?.map(({ user_id, review, rating, created_at }) => (
          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <label>
                <div
                  class="rating"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <i
                    className={
                      rating >= 1 || rating > 1
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    className={
                      rating >= 2 || rating > 2
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    className={
                      rating >= 3 || rating > 3
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    className={
                      rating >= 4 || rating > 3
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    className={
                      rating >= 5 || rating > 4
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                </div>
              </label>
            </div>
            <div>
              <p>{review}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
