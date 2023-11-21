import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  allYourReviews,
  deleteAReview,
  editAReview,
  removeItem,
} from "../../store/review";

import "./deleteModal.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

//PLEASE CHANGE names/variables

function EditReview({ reviewId, productId }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const reviews = Object.values(useSelector((state) => state.review));
  const target = reviews.find((ele) => ele.id == reviewId);
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const stock = {
    user_id: user.id,
    product_id: productId,
    review: target?.review,
    rating: target?.rating,
  };

  function checkCredentials() {
    console.log("INSIDE THE CREDENTIAL CHECK");
    const errObj = {};
    if (!rating) errObj.rating = "Rating is required";
    if (!reviewText || reviewText.length < 4)
      errObj.reviewText = "Review text must be at least 4 characters";
    setErrors(errObj);
  }
  const reviewsLength = Object.values(
    useSelector((state) => state.review)
  ).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editAReview(target.id, stock))
      .then(() => closeModal())
      .then(() => history.push(`/products/${productId}`));
  };
  useEffect(() => {
    allYourReviews(user.id);
  }, [reviewsLength]);

  return (
    <>
      <h1>Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review
          <input
            type="textArea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Rating
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditReview;
