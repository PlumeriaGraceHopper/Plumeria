import axios from "axios";

//constant
const GET_USER = "GET_USER"
const SET_CART = "SET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
const ADD_CART = "ADD_CART"
const ADD_TO_ORDER = "ADD_TO_ORDER" 
const UPDATE_FLOWER = "UPDATE_FLOWER" 

//action creator
export const getUser = user =>{
  return {
    type: GET_USER,
    user
  }
}

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

export const updateFlower = (quantity) => {
  return {
    type: UPDATE_FLOWER,
    quantity
  };
};

//thunk
export const fetchUser = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
     
      dispatch(getUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCart = id => {
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

export const fetchUpdateFlower = (userId, OrderDetailId, quantity) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/${OrderDetailId}/${quantity}`);
      dispatch(updateFlower(data));
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
    } catch (err) {
      console.log(err);
    }
  };
};





export default function singleUserReducer(state = [], action) {
  
  switch (action.type) {
    // case GET_USER:
    //   return action.user;
    case SET_CART: //only runs if we are on the /cart page
      return action.user;
      //updated this to action.user instead of action.cart
      //did not work with action.cart
    case REMOVE_ITEM:
      return state.filter((orderDetailId) => orderDetailId.id !== action.orderDetailId.id )
    case ADD_CART:
      return {...state, order: action.order}
    case ADD_TO_ORDER: 
      //return {...state, order: [...state.order, action.orderDetail]} 
      return {...state, order: [action.orderDetail]} 
    case UPDATE_FLOWER: 
      return {...state, order: [...state.order, action.orderDetail]}    
    default:
      return state;
  }
  
}
