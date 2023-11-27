const CREATE_REVIEW = "review/CREATE_REVIEW";
const ALL_REVIEWS = "reviews/ALL_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const initialState = {};

const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

const allReviews = (payload) => {
  return {
    type: ALL_REVIEWS,
    payload,
  };
};
const deleteReview = (payload, reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};
const editReview = (reviewId, payload) => {
  return {
    type: EDIT_REVIEW,
    payload,
  };
};

export const allTheReviews = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`);
  const reviews = await response.json();
  dispatch(allReviews(reviews));
  return reviews;
};
export const allYourReviews = (userId) => async (dispatch) => {
  // console.log("🚀 ~ file: review.js:36 ~ allYourReviews ~ userId:", userId);
  const response = await fetch(`/api/reviews/${userId}/reviews`);
  const reviews = await response.json();
  console.log(reviews);
  dispatch(allReviews(reviews));
  // return reviews;
};
export const createAReview = (productId, payload) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const review = await response.json();
  dispatch(createReview(review));
  return review;
};
export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteReview(reviewId));
  return response;
};
export const editAReview =
  (reviewId, payload, productId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const review = await response.json();
    dispatch(allTheReviews(productId));
    return review;
  };
const review = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_REVIEWS:
      newState = {};
      action.payload.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    // case EDIT_REVIEW:
    //   newState = { ...state, [action.payload.id]: action.payload };
    //   return newState;
    case DELETE_REVIEW:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.reviewId];
      return deleteState;
    default:
      return state;
  }
};

export default review;
