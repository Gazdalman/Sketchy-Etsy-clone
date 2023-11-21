import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews, deleteAReview, removeItem } from "../../store/review";

import "./deleteModal.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

//PLEASE CHANGE names/variables

function DeleteReview({ reviewId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const reviewsLength = Object.values(
    useSelector((state) => state.review)
  ).length;
  console.log(
    "🚀 ~ file: deleteModalReview.js:17 ~ DeleteReview ~ reviews:",
    reviewsLength
  );
  console.log(
    "🚀 ~ file: deleteModalReview.js:16 ~ DeleteReview ~ user:",
    user
  );

  const deleteReview = async (e) => {
    e.preventDefault();

    await dispatch(deleteAReview(reviewId)).then(closeModal);

    // history.push(`/reviews/${user.id}`);
    // return Redirect(`/products/${user.id}`);
  };
  useEffect(() => {
    allYourReviews(user.id);
  }, [reviewsLength]);

  return (
    <div className="delete-button-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to permanently DELETE this Review?</p>
      <button id="delete-btn" onClick={deleteReview}>
        Yes (Delete Review)
      </button>
      <button id="keep-btn" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReview;
