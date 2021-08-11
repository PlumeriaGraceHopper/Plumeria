import axios from "axios";

//constant
const SET_CART = "SET_CART";
const SET_CART_ID = "SET_CART_ID";
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

export const setCartId = order => {
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

export const updateFlower = (orderDetail) => {
  return {
    type: UPDATE_FLOWER,
    orderDetail
  };
};

//thunk
export const fetchCart = token => { 
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/cart`, {headers: { Authorization: token }});
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCartId = (id) => { 
  return async dispatch => {
    try {

      const { data } = await axios.get(`/api/cart/${id}`);
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeItemFromCart = (token, orderDetailId) => { 

  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/cart/${orderDetailId}`, {headers: { Authorization: token }});
      dispatch(removeItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAddCart = (token, flowerId, quantity) => { 
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/cart/${flowerId}/${quantity}`,null, {headers: { Authorization: token }});
      dispatch(addCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAddToOrder = (token, OrderId, flowerId, quantity) => { 
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/cart/${OrderId}/${flowerId}/${quantity}`, null , {headers: { Authorization: token }});
      dispatch(addToOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUpdateFlower = (token, OrderDetail, quantity ) => { //same here
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/cart/${OrderDetail}/${quantity}`, null, {headers: { Authorization: token }});
      dispatch(updateFlower(data));
    } catch (err) {
      console.log(err);
    }
  };
};


//this is now going to be state.cart 
export default function cartReducer(state = {}, action) { 
  switch (action.type) {


    case SET_CART: 
      return action.order;
      case SET_CART_ID: 
      return action.order;
    case REMOVE_ITEM:
      return state.filter((orderDetailId) => orderDetailId.id !== action.orderDetailId.id )
    case ADD_CART:
      return action.order
    case ADD_TO_ORDER: 
      return {...state, OrderDetails: [...state.OrderDetails, action.orderDetail]} 
    case UPDATE_FLOWER: 
      return {
        ...state, OrderDetails : OrderDetails.map((eachOrder) => {
          if (eachOrder.id === action.orderDetail.id) {
            eachOrder.quantity = action.orderDetail.quantity //or we can make it = action.orderDetail?
          } return eachOrder
        })
     }
        default:
          return state;
    }
  }




  
