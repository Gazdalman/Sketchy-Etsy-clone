const GET_ALL = "orders/getAll";
const GET_ONE = "orders/getOne";
const PLACE_ORDER = "orders/placeOrder";

const getOrders = (orders) => {
  return {
    type: GET_ALL,
    orders,
  };
};

export const placeOrder = () => async (dispatch) => {
  const res = await fetch("/api/orders/place", {
    method: ["POST"],
  });
  const data = await res.json();
  // console.log(data);
  return data.Order;
  // const res = await fetch("/api/orders/place", {
  //   method: "POST",
  // });

  // if (res.ok) {
  //   const order = await res.json();
  //   await dispatch(getAllOrders());
  //   return order;
  // }
};

export const addUserOrderItems =
  ({ formData }) =>
  async (dispatch) => {
    // ! add orders
    // console.log("formData hitting addUserOrderItems thunk => ", formData);
    const res = await fetch(`/api/orders/place`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // console.log(res);
    // const data = await res.json();
    // console.log(data);
  };

export const getAllOrders = () => async (dispatch) => {
  const res = await fetch(`/api/orders/`);

  if (res.ok) {
    const orders = await res.json();
    dispatch(getOrders(orders));
  }
};

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...action.orders };

    default:
      return state;
  }
};

export default orderReducer;
