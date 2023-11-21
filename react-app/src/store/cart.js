const GET_CART = "cart/GET_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
// * may remove line 4 - depends on how I end up deciding how to do item removal
const REMOVE_ITEM = "cart/REMOVE_ITEM";

const getAllCartItems = (userCart) => ({
  type: GET_CART,
  payload: userCart,
});

const addItemToCart = (updatedCart) => ({
  type: ADD_TO_CART,
  payload: updatedCart,
});

// * may remove lines 17 thru 20 - depends on how I end up deciding how to do item removal
const removeItemFromCart = (cart) => ({
  type: REMOVE_ITEM,
  payload: cart,
});

export const getCart = (userId) => async (dispatch) => {
  const res = await fetch("/api/cart/" + Number(userId));
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.errors) {
      console.log(cartData.errors);
      return;
    }
    dispatch(getAllCartItems(cartData));
  }
};

export const addToCart = (itemId) => async (dispatch) => {
  // ! need to create the backend route for adding an item to cart
  const res = await fetch("");
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.errors) {
      console.log(cartData.errors);
      return;
    }
    dispatch(addItemToCart(cartData));
  }
};

export const removeItem = (itemId) => async (dispatch) => {
  const res = await fetch("");
  if (res.ok) {
    const cartData = await res.json();
    if (cartData.errors) {
      console.log(cartData.errors);
      return;
    }
    // ? maybe instead send cart list with item removed then run thris through getAllCartItems
    dispatch(removeItemFromCart(cartData));
  }
};

export default function reducer(state = { cart: [] }, action) {
  // * CRUD -> create on signup & delete on checkout
  const new_state = {};
  switch (action.type) {
    case GET_CART:
      // * read
      new_state.cart = [...action.payload.products];
      return new_state;
    case ADD_TO_CART:
      // * update
      new_state.cart = [...state.cart, action.payload.product];
      // ! may need to make changes to new_state structure
      return new_state;
    default:
      return state;
  }
}
