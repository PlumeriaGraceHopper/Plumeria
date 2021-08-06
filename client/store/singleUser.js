import axios from "axios";

//constant
const SET_CART = "SET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";

//action creator
export const setCart = user => {
  return {
    type: SET_CART,
    user,
    //updated this and param to action.user instead of action.cart
  };
};

export const removeItem = orderDetailId => {
  return {
    type: REMOVE_ITEM,
    orderDetailId
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

export const removeItemFromCart = orderDetailId => {

  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/users/${orderDetailId}`);
      dispatch(removeItem(data));
      console.log('This is the Thunk data:', data)
      console.log('This is the thunk id: ' , orderDetailId)
    } catch (err) {
      console.log(err);
    }
  };
};





export default function singleUserReducer(state = [], action) {
  
  switch (action.type) {
    case SET_CART:
      console.log("STATE IN THE USER RED: ", state)
      return action.user;
      //updated this to action.user instead of action.cart
      //did not work with action.cart
    case REMOVE_ITEM:
      return state.filter((orderDetailId) => orderDetailId.id !== action.orderDetailId.id )
        return 
    default:
      return state;
  }
  
}
