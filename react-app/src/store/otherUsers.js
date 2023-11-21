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
  // console.log("res => ", res);
  if (res.ok) {
    const usersObj = await res.json();
    // console.log("usersObj ===> ", usersObj);
    dispatch(allUsers(usersObj));
  }
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_ALL:
      // console.log(action.payload);
      new_state = { ...action.payload };
      return new_state;
    default:
      return state;
  }
}
