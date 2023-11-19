const GET_CART = "cart/GET_CART";

const getAllCartItems = (userCart) => ({
  type: GET_CART,
  payload: userCart,
});

export const getCart = () => async (dispatch) => {
  const res = await fetch("/api/cart/");
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.errors) {
      console.log(cartData.errors);
      return;
    }
    dispatch(getAllCartItems(cartData));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      const new_state = action.payload;
      return new_state;
    default:
      return state;
  }
}
