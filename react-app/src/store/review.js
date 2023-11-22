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
  console.log("DO I ENTER THE REvIEW THUNK");
  const response = await fetch(`/api/reviews/${productId}`);
  const reviews = await response.json();
  dispatch(allReviews(reviews));
  return reviews;
};
export const allYourReviews = (userId) => async (dispatch) => {
  console.log("🚀 ~ file: review.js:36 ~ allYourReviews ~ userId:", userId);
  const response = await fetch(`/api/reviews/${userId}/reviews`);
  const reviews = await response.json();
  console.log(reviews);
  dispatch(allReviews(reviews));
  // return reviews;
};
export const createAReview = (productId, payload) => async (dispatch) => {
  console.log("INSIDE THE CREATION REVIEW THUNK");
  const response = await fetch(`/api/reviews/${productId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("🚀 ~ file: review.js:48 ~ createAReview ~ response:", response);
  // if (response.ok) {
  const review = await response.json();
  console.log("SHOULD BE DISPATCHING FROM THE CREATION REVIEW THUNK");
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
export const editAReview = (reviewId, payload) => async (dispatch) => {
  console.log("🚀 ~ file: review.js:73 ~ editAReview ~ payload:", payload);
  console.log("DO I ENTER THE THUNK???");
  const response = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(payload),
    body: JSON.stringify(payload),
  });
  console.log("🚀 ~ file: review.js:76 ~ editAReview ~ response:", response);
  console.log("DO I GET PAST THE FETCH??");
  const review = await response.json();
  review.id = reviewId;
  console.log("🚀 ~ file: review.js:81 ~ editAReview ~ review:", review);
  dispatch(editReview(review));
  console.log("AM I RETURNING ANYTHING??");
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
    case EDIT_REVIEW:
      newState = { ...state };
      console.log("🚀 ~ file: review.js:101 ~ review ~ newState:", newState);
      newState[action.id] = action.payload;
      return newState;
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
