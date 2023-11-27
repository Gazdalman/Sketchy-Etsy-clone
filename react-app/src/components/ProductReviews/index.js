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

function Reviews({ product }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const target = Object.values(products).find((ele) => ele.id == productId);
  const user = useSelector((state) => state.session.user);
  const users = Object.values(useSelector((state) => state.allUsers));
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
      list[i].User = users?.find((ele) => ele.id == list[i].user_id);
      list[i].commented = false;
      newbie.push(list[i]);
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

  const owns = (ele) => ele.seller_id == user.id;

  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    dispatch(allTheReviews(productId))
      .then(() => dispatch(getAllUsers()))
      .then(() => setIsLoaded(true));
  }, [dispatch, reviewsLength]);
  const commentedat = "commented at";
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "20%",
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
        <div
          className="inside-man"
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0 5px 0 10px",
          }}
        >
          <h1 style={{ padding: "0 5px" }}>{avg?.toFixed(2)}</h1>
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
        {!commented && user && user.id != product.seller_id ? (
          <OpenModalButton
            buttonText="Add Review"
            modalClasses={["add-edit-button-container"]}
            onButtonClick={closeMenu}
            modalComponent={<ReviewFormModal productId={productId} />}
          />
        ) : null}

        {isLoaded && reviewsLength >= 1 ? (
          reviews?.map(({ id, user_id, review, rating, created_at, User }) => (
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid grey",
                padding: "5px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                className="review-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "85%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <p
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {review}
                  </p>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "darkgray",
                    }}
                  >
                    {`${User.firstName}, ${User.username} commented at ${created_at}`}
                  </span>
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
              <div className="review-buttons">
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
                    modalClasses={["edit-button-container"]}
                    buttonText="Edit Review"
                    modalComponent={
                      <EditReview reviewId={id} productId={productId} />
                    }
                  />
                ) : null}
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
