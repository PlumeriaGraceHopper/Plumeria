import axios from 'axios'

//constant
const SET_CART = 'SET_CART'

//action creator
export const setCart = (cart) => {
    return{
        type: SET_CART,
        cart
    }
};

//thunk
export const fetchCart = () => { //returns orders that are false
    return async(dispatch) => {
        try {
            const {data} = await axios.get('/api/users/:userId/cart')
            dispatch(setCart(data));
        } catch (err) {
            console.log(err)
        }
    }
};

export default function singleUserReducer (state = [], action) {
    switch (action.type) {
        case SET_CART: 
            return action.cart
        default:
            return state
    }
};