const GET_PRODUCTS = "userStuff/getUserProducts";

const populateUserProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const getUserProducts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/products/user/${userId}`);

  if (res.ok) {
    const products = await res.json();
    dispatch(populateUserProducts(products));
    // return products;
  }
};

const userProducts = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      const newState = { ...action.products };
      // const products = [...Object.values(action.products)];
      // products.forEach((prod) => {
      //   newState[prod.id] = prod;
      // });
      return newState;

    default:
      return state;
  }
};

export default userProducts;
