const GET_ALL = "user/GET_ALL";

const allUsers = (users) => ({
  type: GET_ALL,
  payload: users,
});

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch("/api/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const usersObj = await res.json();
    dispatch(allUsers(usersObj));
  }
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_ALL:
      action.payload.users.forEach((user) => {
        new_state[user.id] = user;
      });
      return new_state;
    default:
      return state;
  }
}
