import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Reviews() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  //   console.log("🚀 ~ file: index.js:9 ~ Reviews ~ userId:", userId);
  const reviews = useSelector((state) => state.review);
  console.log("🚀 ~ file: index.js:11 ~ Reviews ~ Reviews:", reviews[0]);
  // console.log("🚀 ~ file: index.js:8 ~ Reviews ~ user:", user);
  const [activeRating, setActiveRating] = useState(0);
  const reviewsLength = reviews?.length;
  console.log(
    "🚀 ~ file: index.js:16 ~ Reviews ~ reviewsLength:",
    reviewsLength
  );
  // // console.log(reviews[0].rating);
  let sum = 0;
  if (reviewsLength >= 1) {
    //   for (let ele in reviews) {
    //     sum += parseInt(ele.rating);
    //   }
    // }

    reviews?.forEach((ele) => {
      sum = sum + ele.rating;
    });
    sum = reviews.reduce((acc, review) => review.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / reviewsLength;
  }
  // setActiveRating(avg);
  // if (reviewsLength >= 1) {
  // } else {
  //   setActiveRating(0);
  // }

  console.log("🚀 ~ file: index.js:15 ~ Reviews ~ activeRating:", avg);

  useEffect(() => {
    console.log("DID I ENTER THE USE EFFECT");
    dispatch(allYourReviews(userId));
    // e.preventDefault();
  }, [dispatch, userId]);
  return (
    <>
      <p>JUST HERE AT THE REVIEWS</p>
      <p>
        {reviewsLength == 1 ? (
          <h1>
            {reviewsLength} Reviews {avg.toFixed(2)}
          </h1>
        ) : (
          <h1>
            {reviewsLength} Reviews {avg.toFixed(2)}
          </h1>
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
      </p>
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
