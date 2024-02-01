const GET_USER = "user/GET_USER";

const getAUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const getUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const userData = await res.json();
    if (userData.errors) {
      // console.log(userData.errors);
      return;
    }
    // console.log(userData);
    dispatch(getAUser(userData));
  }
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_USER:
      // console.log(action.payload);
      new_state = { ...action.payload };
      return new_state;
    default:
      return state;
  }
}
