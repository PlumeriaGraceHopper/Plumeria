import axios from "axios";

//constant
const SET_CART = "SET_CART";

//action creator
export const setCart = user => {
  return {
    type: SET_CART,
    user,
    //updated this and param to action.user instead of action.cart
  };
};

//thunk
export const fetchCart = id => {
  //returns orders that are false
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${id}/cart`);
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function singleUserReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.user;
      //updated this to action.user instead of action.cart
      //did not work with action.cart
    default:
      return state;
  }
}
