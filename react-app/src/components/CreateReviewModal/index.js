import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { allTheReviews, createAReview } from "../../store/review";

function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState({});
  const disabled = reviewText.length < 4;
  const reviews = useSelector((state) => state.review);

  function checkCredentials() {
    console.log("INSIDE THE CREDENTIAL CHECK");
    const errObj = {};
    if (!rating) errObj.rating = "Rating is required";
    if (!reviewText || reviewText.length < 4)
      errObj.reviewText = "Review text must be at least 4 characters";
    setErrors(errObj);
  }
  const newReview = {
    user_id: user?.id,
    product_id: productId,
    review: reviewText,
    rating,
  };
  if (!user) {
    history.push("/login");
  }

  const handleSubmit = async (e) => {
    checkCredentials();
    e.preventDefault();
    await dispatch(createAReview(productId, newReview)).then(() =>
      closeModal()
    );

    history.push(`/products/${productId}`);
    return Redirect(`/products/${productId}`);
  };

  return (
    <>
      {user == null ? (
        <h1>PLEASE SIGN IN</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Describe the Product in Your own Words</h1>
          <form onSubmit={handleSubmit}>
            <label style={{ width: "80%" }}>
              <textarea
                rows="10"
                cols="45"
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </label>
            {errors.reviewText && <p className="errors">{errors.reviewText}</p>}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <label>
                <div
                  class="rating"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    onMouseEnter={() => {
                      if (!disabled) setActiveRating(1);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setActiveRating(rating);
                    }}
                    onClick={() => {
                      if (!disabled) setRating(1);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 1 || rating >= 1
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      if (!disabled) setActiveRating(2);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setActiveRating(rating);
                    }}
                    onClick={() => {
                      if (!disabled) setRating(2);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 2 || rating >= 2
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      if (!disabled) setActiveRating(3);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setActiveRating(rating);
                    }}
                    onClick={() => {
                      if (!disabled) setRating(3);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 3 || rating >= 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      if (!disabled) setActiveRating(4);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setActiveRating(rating);
                    }}
                    onClick={() => {
                      if (!disabled) setRating(4);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 4 || rating >= 4
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      if (!disabled) setActiveRating(5);
                    }}
                    onMouseLeave={() => {
                      if (!disabled) setActiveRating(rating);
                    }}
                    onClick={() => {
                      if (!disabled) setRating(5);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 5 || rating >= 5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <span>stars</span>
                </div>
              </label>
            </div>
            {errors.rating && <p className="errors">{errors.rating}</p>}
            <button
              type="submit"
              // onClick={checkCredentials}
              // onClick={handleSubmit}
              disabled={disabled}
              style={{
                backgroundColor: "red",
                maxWidth: "100%",
                width: "300px",
              }}
            >
              Submit Your Review
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ReviewFormModal;
