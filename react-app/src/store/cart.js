const GET_CART = "cart/GET_CART";
// const REMOVE_ITEM = "cart/REMOVE_ITEM";

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
    // console.log(cartData);
    dispatch(getAllCartItems(cartData));
  }
};

export const removeItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/cart/product/${itemId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.error) {
      console.log(cartData.error);
      return;
    }
    // console.log(cartData);
    dispatch(getCart());
  }
};

export const updateQuantity = (itemId, change) => async (dispatch) => {
  const res = await fetch(`/api/cart/${change}/${itemId}`, {
    method: "PUT",
  });
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.error) {
      console.log(cartData.error);
      return;
    }
    // console.log(cartData);
    dispatch(getCart());
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      const new_state = { ...action.payload.cart };
      return new_state;
    default:
      return state;
  }
}
