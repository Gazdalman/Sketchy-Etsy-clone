import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews, deleteAReview, removeItem } from "../../store/review";

import "./deleteModal.css";

import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

//PLEASE CHANGE names/variables

function DeleteReview({ reviewId, productId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const reviewsLength = Object.values(
    useSelector((state) => state.review)
  ).length;

  const deleteReview = async (e) => {
    e.preventDefault();

    await dispatch(deleteAReview(reviewId))
      .then(closeModal)
      .then(() => history.push(`/reviews/${productId}`))
      .then(() => history.push(`/products/${productId}`));

    // history.push(`/reviews/${user.id}`);
    // return Redirect(`/products/${user.id}`);
  };
  useEffect(() => {
    allYourReviews(user.id);
  }, [reviewsLength]);

  return (
    <div className="delete-button-container" id="deleteReviewModel">
      <h2 id="delReviewModalTitle">Confirm Delete</h2>
      <p id="delReviewModalText">
        Are you sure you want to permanently DELETE this Review?
      </p>
      <div id="delReviewModalButtons">
        <button id="delete-review-btn" onClick={deleteReview}>
          Yes (Delete Review)
        </button>
        <button id="keep-review-btn" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReview;
