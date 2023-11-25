import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allYourReviews, deleteAReview, removeItem } from "../../store/review";

import "./deleteModal.css";

import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

//PLEASE CHANGE names/variables

function DeleteReview({ reviewId, productId }) {
  console.log(
    "🚀 ~ file: deleteModalReview.js:13 ~ DeleteReview ~ productId:",
    productId
  );
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
    <div className="delete-button-container" id="deleteModel">
      <h2 id="delModalTitle">Confirm Delete</h2>
      <p id="delModalText">
        Are you sure you want to permanently DELETE this Review?
      </p>
      <div id="delModalButtons">
        <button id="delete-btn" onClick={deleteReview}>
          Yes (Delete Review)
        </button>
        <button id="keep-btn" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReview;
