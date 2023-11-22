const GET_CART = "cart/GET_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";

const getAllCartItems = (userCart) => ({
  type: GET_CART,
  payload: userCart,
});

const addToCart = (newItem) => ({
  type: ADD_TO_CART,
  payload: newItem,
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
    dispatch(getCart());
  }
};

export const addItemToCart = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    dispatch(getCart());
  }
};

export default function reducer(state = { cart: [] }, action) {
  let new_state = {};
  switch (action.type) {
    case GET_CART:
      new_state = { ...action.payload.cart };
      return new_state;
    default:
      return state
  }
}
