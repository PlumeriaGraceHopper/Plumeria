import axios from "axios";

//constant
const SET_CART = "SET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
const ADD_CART = "ADD_CART"
const ADD_TO_ORDER = "ADD_TO_ORDER" 
const UPDATE_FLOWER = "UPDATE_FLOWER" 

//action creator

export const setCart = order => {
  return {
    type: SET_CART,
    order,
    
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
export const fetchCart = token => { //REMEMBER TO INPUT LOCALSTORAGE.TOKEN WHEREVER THIS THUNK IS BEING CALLED
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/cart`, {headers: { Authorization: token }});
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeItemFromCart = orderDetailId => { //we access orderDetails id not user id (can be changed for security)

  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/${orderDetailId}`);
      dispatch(removeItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAddCart = (token, flowerId, quantity) => { //REMEMBER LOCALSTORAGE.TOKEN INPUT in component
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/${flowerId}/${quantity}`,{headers: { Authorization: token }});
      dispatch(addCart(data));
      console.log('This is the Thunk data:', data)
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAddToOrder = ( OrderId, flowerId, quantity) => { //these don't use userID it because User association already exists unless we want to be extra secure
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/${OrderId}/${flowerId}/${quantity}`);
      dispatch(addToOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateFlower = ( OrderDetailId, quantity ) => { //same here
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/${OrderDetailId}/${quantity}`);
      dispatch(updateFlower(data));
    } catch (err) {
      console.log(err);
    }
  };
};


//this is now going to be state.cart 
export default function cartReducer(state = {}, action) { //REMEMBER STATE.CART IS NOW EMPTY OBJ {} 
  switch (action.type) {
    case SET_CART: 
      return action.order;
    case REMOVE_ITEM:
      return state.filter((orderDetailId) => orderDetailId.id !== action.orderDetailId.id )
    case ADD_CART:
      return {...state, order: action.order}
    case ADD_TO_ORDER: 
      return {...state, order: [...state.order, action.orderDetail]} 
    case UPDATE_FLOWER: 
      return {...state, order: [...state.order, action.orderDetail]}    
    default:
      return state;
  }
  
}
