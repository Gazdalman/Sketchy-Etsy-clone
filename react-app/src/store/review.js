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

export const allYourReviews = (userId) => async (dispatch) => {
  console.log("DO I ENTER THE REvIEW THUNK");
  const response = await fetch(`/api/reviews/${userId}`);
  const reviews = await response.json();
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ response:", response);
  console.log("🚀 ~ file: review.js:29 ~ allYourReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews));
  return reviews;
};
export const makeReview = (productId, payload, userId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/review`, {
    method: "POST",
    body: { ...payload },
  });
  if (response.ok) {
    const review = await response.json();
    review.user_id = userId;
    dispatch(createReview(review));
    return review;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};
export const deleteAReview = (payload, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    body: { ...payload },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data, reviewId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

const review = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_REVIEWS: {
      console.log(
        "🚀 ~ file: review.js:77 ~ action.payload.Reviews.forEach ~ action:",
        action
      );
      // const returnData = {};
      // action.payload.Reviews.forEach((review) => {
      //   returnData[review.id] = review;
      // });
      // return returnData;
      return { reviews: action.payload };
    }
    // case CREATE_REVIEW:
    //   newState = { ...state };
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // case DELETE_REVIEW:
    //   let deleteState;
    //   deleteState = { ...state };
    //   delete deleteState[action.payload];
    //   return deleteState;
    default:
      return state;
  }
};

export default review;
