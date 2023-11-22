import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allTheReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import DeleteReview from "../DeleteModal/deleteModalReview";
import EditReview from "../EditReviewModal/editModalReview";
import { getAllUsers } from "../../store/otherUsers";

function Reviews() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { productId } = useParams();
  const user = useSelector((state) => state.session.user);
  const unorderedReviews = useSelector((state) => state.review);
  const review = orderReviews(Object.values(unorderedReviews));
  const reviews = addUsers(review, users);
  const [isLoaded, setIsLoaded] = useState(false);
  const reviewsLength = reviews?.length;
  function orderReviews(list) {
    let newbie = [];
    for (let i = list.length - 1; i >= 0; i--) {
      newbie.push(list[i]);
    }
    return newbie;
  }
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].User = users.find((ele) => ele.id == list[i].user_id);
      list[i].Owns = newbie.push(list[i]);
    }
    return newbie;
  }
  let sum = 0;
  if (reviewsLength >= 1) {
    // reviews?.forEach((ele) => {
    //   sum = sum + ele.rating;
    // });
    sum = reviews?.reduce((acc, review) => review?.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / reviewsLength;
  }
  let commented = false;
  const exists = (element) => element?.user_id == user.id;
  if (user && reviewsLength >= 1) {
    commented = reviews?.some(exists);
  }
  console.log("🚀 ~ file: index.js:29 ~ Reviews ~ commented:", commented);
  const owns = (ele) => ele.seller_id == user.id;

  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    dispatch(allTheReviews(productId))
      .then(() => dispatch(getAllUsers()))
      .then(() => setIsLoaded(true));
  }, [dispatch, reviewsLength]);
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
        {reviewsLength < 1 ? (
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
        ) : null}

        {isLoaded && reviewsLength >= 1 ? (
          reviews?.map(({ id, user_id, review, rating, created_at, User }) => (
            <>
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
                  <p>
                    {User.firstName} {User.username} {created_at}
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
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
              {user?.id == user_id ? (
                <OpenModalButton
                  modalClasses={["delete-button-container"]}
                  buttonText="Delete Review"
                  modalComponent={
                    <DeleteReview reviewId={id} productId={productId} />
                  }
                />
              ) : null}
              {user?.id == user_id ? (
                <OpenModalButton
                  modalClasses={["delete-button-container"]}
                  buttonText="Edit Review"
                  modalComponent={
                    <EditReview reviewId={id} productId={productId} />
                  }
                />
              ) : null}
            </>
          ))
        ) : (
          <h1>REVIEWS DON'T EXIST</h1>
        )}
      </div>
    </>
  );
}

export default Reviews;
