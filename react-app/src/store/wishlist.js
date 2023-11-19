const ALL_WISH = "wishlist/ALL_WISH";
const initialState = {}

const allWish = (wishlist) => ({

    type: ALL_WISH,
    payload: wishlist

})


export const getWish = ()  => async (dispatch) => {
    const response = await fetch(`/api/wishlist/` , {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(allWish(data));

        console.log('fettch wishl', data)
    }

};



export default function wishlist( state = initialState, action) {
    switch(action.type) {
        case ALL_WISH:
            return action.payload
        default:
            return state;
    }
}
