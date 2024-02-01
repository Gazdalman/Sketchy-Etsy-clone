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
import "./index.css";

function ReviewFormModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState({});
  const disabled = false;
  const reviews = useSelector((state) => state.review);

  function checkCredentials() {
    const errObj = {};
    if (!rating) {
      errObj.rating = "Rating is required";
    }
    if (!reviewText || reviewText.length < 4) {
      errObj.reviewText = "Review text must be at least 4 characters";
    }
    if (reviewText.length > 2000) {
      errObj.reviewText = `Don't nobody wanna read allat. That's a whole ${reviewText.length} characters?!! Go ahead and shorten that for me bub`;
    }
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
    e.preventDefault();
    if (errors && !Object.values(errors).length) {
      await dispatch(createAReview(productId, newReview)).then(() =>
        closeModal()
      );

      history.push(`/products/${productId}`);
      return Redirect(`/products/${productId}`);
    } else {
      return;
    }
  };

  return (
    <div className="add-review-button-container">
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
          <h1 className="title">Add ProductReview</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label style={{ width: "100%" }}>
              <textarea
                className="textarea"
                rows="10"
                cols="45"
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                // required
              />
            </label>
            {errors.reviewText ? (
              <p className="errors">{errors.reviewText}</p>
            ) : null}
            <label>Rating</label>
            <div
              className="stars"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
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
              id="add-review"
              onClick={checkCredentials}
              style={{
                maxWidth: "100%",
                width: "300px",
              }}
            >
              Submit Your Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewFormModal;
