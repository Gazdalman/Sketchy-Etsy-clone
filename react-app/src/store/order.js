const GET_ALL = 'orders/getAll';
const GET_ONE = 'orders/getOne';
const PLACE_ORDER = 'orders/placeOrder';

const getOrders = (orders) => {
  return {
    type: GET_ALL,
    orders
  }
}

export const getAllOrders = () => async dispatch => {
  const res = await fetch(`/api/orders`)

  if (res.ok) {
    const orders = await res.json()
    dispatch(getOrders(orders))
  }
}

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL:
      return {...action.orders}

    default:
      return state
  }
}

export default orderReducer
