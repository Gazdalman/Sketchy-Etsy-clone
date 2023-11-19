const CREATE_REVIEW = "review/CREATE_REVIEW"
const ALL_REVIEWS = "reviews/allReviews";
const DELETE_REVIEW = "reviews/deleteReview";
const initialState = {}


const createReview = (payload) => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}

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

export const allTheReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/`);
  const reviews = await response.json();
  console.log("🚀 ~ file: reviews.js:22 ~ allTheReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews));
  return reviews;
};
export const makeReview = (productId, payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/review`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload
    }),
  });
    if (response.ok) {
    const review = await response.json();
    review.user_id = userId
    dispatch(createReview(review))
    return review;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
}

}
export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
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
      const returnData = {};
      // newState = { ...action.payload };
      action.payload.Reviews.forEach((review) => {
        returnData[review.id] = review;
      });
      return returnData;
    }
    case CREATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      let deleteState;
      console.log(
        "🚀 ~ file: reviews.js:79 ~ reviewReducer ~ action.payload:",
        action.payload
      );
      deleteState = { ...state };
      delete deleteState[action.payload];
      return deleteState;
    default:
      return state;
  }
};

export default review;
