import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allTheReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";

function Reviews() {
  //   console.log("🚀 ~ file: index.js:7 ~ Reviews ~ productId:", product);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { productId } = useParams();
  console.log("🚀 ~ file: index.js:14 ~ Reviews ~ productId:", productId);
  const user = useSelector((state) => state.session.user);
  //   const users = useSelector((state) => state.user);
  //   console.log("🚀 ~ file: index.js:13 ~ Reviews ~ users:", users);
  console.log("🚀 ~ file: index.js:11 ~ Reviews ~ user:", user);
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
  let commented = false;
  const exists = (element) => element.user_id == user.id;
  if (user && reviewsLength >= 1) {
    commented = reviews?.some(exists);
  }
  console.log("🚀 ~ file: index.js:29 ~ Reviews ~ commented:", commented);
  const owns = (ele) => ele.user_id == user.id;
  //   const openMenu = () => {
  //     if (showMenu) return;
  //     setShowMenu(true);
  //   };
  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    dispatch(allTheReviews(productId));
  }, [dispatch, productId]);
  return (
    <>
      <h1>REVIEWS APPEAR</h1>
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
          <span>
            <h1>
              {reviewsLength} Reviews {avg?.toFixed(2)} Stars
            </h1>
          </span>
        ) : (
          <span>
            <h1>{reviewsLength} Reviews</h1>
          </span>
        )}
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
      </div>
      <div>
        {!commented ? (
          <OpenModalButton
            buttonText="Add Review"
            className="dropdownLi"
            onButtonClick={closeMenu}
            modalComponent={<ReviewFormModal productId={productId} />}
          />
        ) : (
          //   <h1>Needs Button</h1>
          <h2>you already commented</h2>
        )}

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
                <span>
                  <p>{created_at}</p>
                </span>
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
