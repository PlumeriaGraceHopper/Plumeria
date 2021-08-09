import axios from "axios";

//constant
const SET_CART = "SET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
const ADD_CART = "ADD_CART"
const ADD_TO_ORDER = "ADD_TO_ORDER" 

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

export const addCart = (order) => {
  return {
    type: ADD_CART,
    order
  };
};

export const addToOrder = (orderDetail) => {
  return {
    type: ADD_TO_ORDER,
    orderDetail
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

export const fetchAddCart = (userId, flowerId, quantity) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/${flowerId}/${quantity}`);
      dispatch(addCart(data));
      console.log('This is the Thunk data:', data)
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAddToOrder = (userId, OrderId, flowerId, quantity) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/${OrderId}/${flowerId}/${quantity}`);
      dispatch(addToOrder(data));
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
    case ADD_CART:
      return {...state, order: action.order}
    case ADD_TO_ORDER: 
      return {...state, order: [...state.order, action.orderDetail]}  
    default:
      return state;
  }
  
}
