const ALL_WISH = "wishlist/ALL_WISH";
const initialState = {};

const allWish = (payload) => ({
  type: ALL_WISH,
  payload,
});

export const getWish = (userId) => async (dispatch) => {
  const response = await fetch("/api/wishlist", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(allWish(data));
  }
};

export default function wishlist(state = initialState, action) {
  switch (action.type) {
    case ALL_WISH:
      return action.payload;
    default:
      return state;
  }
}
