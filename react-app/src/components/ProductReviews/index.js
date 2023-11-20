import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTheReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Reviews() {
  //   console.log("🚀 ~ file: index.js:7 ~ Reviews ~ productId:", product);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review);
  console.log("🚀 ~ file: index.js:12 ~ Reviews ~ reviews:", reviews);
  const [activeRating, setActiveRating] = useState(0);
  const reviewsLength = reviews?.length;
  let sum = 0;
  if (reviewsLength >= 1) {
    // reviews?.forEach((ele) => {
    //   sum = sum + ele.rating;
    // });
    sum = reviews.reduce((acc, review) => review.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / reviewsLength;
  }
  console.log("🚀 ~ file: index.js:15 ~ Reviews ~ activeRating:", avg);

  useEffect(() => {
    dispatch(allTheReviews(productId));
  }, [dispatch, productId]);
  return (
    <>
      <h1>REVIEWS APPEAR</h1>
      <div>
        {reviewsLength == 1 ? (
          <span>
            {reviewsLength} Reviews {avg?.toFixed(2)}
          </span>
        ) : (
          <span>
            {reviewsLength} Reviews {avg?.toFixed(2)}
          </span>
        )}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <div
              class="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <i
                className={
                  avg >= 1 || avg > 0.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 2 || avg >= 1.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 3 || avg >= 2.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 4 || avg >= 3.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 5 || avg >= 4.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
            </div>
          </label>
        </div>
      </div>
      <div>
        {reviewsLength >= 1 ? (
          reviews?.map(({ user_id, review, rating, created_at }) => (
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
          ))
        ) : (
          <h1>REVIEWS DON'T EXIST</h1>
        )}
      </div>
    </>
  );
}

export default Reviews;
