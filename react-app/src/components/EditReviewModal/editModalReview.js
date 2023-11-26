import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews, editAReview } from "../../store/review";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import "./index.css";

function EditReview({ reviewId, productId }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const reviews = Object.values(useSelector((state) => state.review));
  const target = reviews.find((ele) => ele.id == reviewId);
  const [activeRating, setActiveRating] = useState(0);

  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const stock = {
    user_id: user.id,
    product_id: productId,
    review: target?.review,
    rating: target?.rating,
  };
  const [review, setReview] = useState(stock.review);
  const [rating, setRating] = useState(stock.rating);
  const [errors, setErrors] = useState({});

  const reviewsLength = Object.values(
    useSelector((state) => state.review)
  ).length;

  const handleSubmit = async (e) => {
    const newStock = {
      user_id: user.id,
      product_id: productId,
      review,
      rating,
    };
    e.preventDefault();
    await dispatch(editAReview(reviewId, newStock, productId))
      .then(() => closeModal())
      .then(() => history.push(`/products/${productId + 1}`))
      .then(() => history.push(`/products/${productId}`));
    console.log("DO I GET PAST THE DISPATCH??");
  };

  return (
    <div className="edit-review-container">
      <h1 className="title">Update Your Review</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label style={{ width: "100%" }}>
          <textarea
            className="textarea"
            rows="10"
            cols="45"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>Rating</label>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <div
              class="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                onMouseEnter={() => {
                  setActiveRating(1);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
                  setRating(1);
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
                  setActiveRating(2);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
                  setRating(2);
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
                  setActiveRating(3);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
                  setRating(3);
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
                  setActiveRating(4);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
                  setRating(4);
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
                  setActiveRating(5);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
                  setRating(5);
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
        <button id="update-review" type="submit">
          Update My Review
        </button>
      </form>
    </div>
  );
}

export default EditReview;
