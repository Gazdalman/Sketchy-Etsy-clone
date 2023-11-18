const GET_CART = "cart/GET_CART";

const getAllCartItems = (userCart) => ({
  type: GET_CART,
  payload: userCart,
});

const initialState = { cart: [] };

export const getCart = (userId) => async (dispatch) => {
  //   console.log(userId);
  const res = await fetch("/api/cart/" + Number(userId));
  //   console.log("/api/cart/" + Number(userId));
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.errors) {
      console.log(cartData.errors);
      return;
    }
    // console.log(cartData);
    dispatch(getAllCartItems(cartData));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      //   console.log(action.payload);
      state.cart = [...action.payload];
      return state;
    default:
      return state;
  }
}
