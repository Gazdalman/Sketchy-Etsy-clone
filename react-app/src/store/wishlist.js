const initialState = {};
const ALL_WISH = "wishlist/ALL_WISH";
const DELETE_WISH = "wishlist/DELETE_WISH";

const allWish = (wishlist) => ({

    type: ALL_WISH,
    payload: wishlist

});

const deleteWish = (productId) => ({

    type: DELETE_WISH,
    payload: productId

});

//get all wish
export const getWish = ()  => async (dispatch) => {
    const response = await fetch("/api/wishlist/" , {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(allWish(data));
    };


};


//delete wish
export const removeWish = (productId) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/delete-wish/${productId}`, {
        method: "DELETE",

    });

    if (response.ok) {
        const message = await response.json();
        if (message.error) {
            console.log(message.error);
            return
        };

        dispatch(deleteWish(productId));
        return message;
    };
}


export default function wishlist(state = initialState, action) {
  switch (action.type) {
    case ALL_WISH:
      return action.payload;
    case DELETE_WISH:
      const newState = {...state}
      console.log('delete state in reducer', newState)
      delete newState[action.payload]
      return newState
    default:
      return state;
  }
}
