const CREATE_REVIEW = "review/CREATE_REVIEW";
const ALL_REVIEWS = "reviews/ALL_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
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

export const allTheReviews = (productId) => async (dispatch) => {
  console.log("DO I ENTER THE REvIEW THUNK");
  const response = await fetch(`/api/reviews/${productId}`);
  const reviews = await response.json();
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ response:", response);
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews));
  return reviews;
};
export const allYourReviews = (userId) => async (dispatch) => {
  console.log("DO I ENTER THE REvIEW THUNK");
  const response = await fetch(`/api/reviews/${userId}`);
  const reviews = await response.json();
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ response:", response);
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews));
  return reviews;
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
  // } else {
  //   const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // }
};
export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteReview(reviewId));
  return response;
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
