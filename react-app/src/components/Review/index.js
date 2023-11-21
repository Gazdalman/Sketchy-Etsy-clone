import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Reviews() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const unorderedReviews = useSelector((state) => state.review);
  const reviews = orderReviews(Object.values(unorderedReviews));
  const [activeRating, setActiveRating] = useState(0);
  const reviewsLength = reviews?.length;
  function orderReviews(list) {
    let newwie = [];
    for (let i = list.length - 1; i >= 0; i--) {
      newwie.push(list[i]);
    }
    return newwie;
  }
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
  // console.log("🚀 ~ file: index.js:15 ~ Reviews ~ activeRating:", avg);

  useEffect(() => {
    dispatch(allYourReviews(userId));
  }, [dispatch, userId]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {reviewsLength == 1 ? (
          <h1>
            {reviewsLength} Reviews {avg?.toFixed(2)}
          </h1>
        ) : (
          <h1>{reviewsLength} Reviews</h1>
        )}
        {!reviewsLength ? (
          <h2>You have no reviewed anything</h2>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>{avg?.toFixed(2)}</h1>
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
        )}
      </div>
      <div>
        {reviewsLength >= 1 ? (
          reviews?.map(({ user_id, review, rating, created_at }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <div>
                <p>{review}</p>
              </div>
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
