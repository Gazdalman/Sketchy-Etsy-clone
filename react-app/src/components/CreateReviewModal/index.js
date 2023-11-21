import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createAReview } from "../../store/review";

function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const { closeModal } = useModal();
  console.log(
    "🚀 ~ file: index.js:22 ~ ReviewFormModal ~ productId:",
    productId
  );
  const user = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState({});
  const disabled = reviewText.length < 10;

  //   console.log("🚀 ~ file: index.js:14 ~ PostAReviewFormModal ~ stars:", rating);
  const newReview = {
    user_id: id,
    product_id: productId,
    review: reviewText,
    rating,
  };
  console.log(
    "🚀 ~ file: index.js:33 ~ ReviewFormModal ~ newReview:",
    newReview
  );
  function checkCredentials() {
    console.log("INSIDE THE CREDENTIAL CHECK");
    const errObj = {};
    if (!rating) errObj.rating = "Rating is required";
    if (!reviewText || reviewText.length < 10)
      errObj.reviewText = "Review text must be at least 10 characters";
    setErrors(errObj);
  }
  const handleSubmit = async (e) => {
    console.log("🚀 ~ file: index.js:24 ~ ReviewFormModal ~ errors:", errors);
    console.log("INSIDE THE HANDLE SUBMIT?");
    e.preventDefault();
    // if (errors && !Object.values(errors).length) {
    console.log("AM I GETTING INSIDE THE IF STATMENT");
    await dispatch(createAReview(productId, newReview)).then(closeModal);
    // }
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
              onClick={checkCredentials}
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