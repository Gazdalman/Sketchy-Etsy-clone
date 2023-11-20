const GET_CART = "cart/GET_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";

const getAllCartItems = (userCart) => ({
  type: GET_CART,
  payload: userCart,
});

const addItemToCart = (updatedCart) => ({
  type: ADD_TO_CART,
  payload: updatedCart,
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

export default function reducer(state = { cart: [] }, action) {
  // * CRUD -> create on signup & delete on checkout
  let new_state = {};
  switch (action.type) {
    case GET_CART:
      new_state = { ...action.payload.cart };
      return new_state;
    default:
      return state
  }
}
