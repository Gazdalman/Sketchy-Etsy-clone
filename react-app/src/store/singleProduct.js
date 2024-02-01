const GET_ONE = "product/getOneProduct";

const getOne = (product) => {
  return {
    type: GET_ONE,
    product,
  };
};

export const getOneProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);

  if (res.ok) {
    const product = await res.json();
    await dispatch(getOne(product));
    return product;
  }

  return { broken: "nope" };
};

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ONE:
      return { ...action.product };

    default:
      return state;
  }
};

export default singleProductReducer;
