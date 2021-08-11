import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCartId, removeItemFromCart } from "../store/cart";
import { fetchFlowers } from "../store/allFlowers";
import { me } from "../store";

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      loading: true
    }
  }

   componentDidMount(){ 
     
    this.props.getCartId(this.props.auth.id);
    this.props.getFlowers();
 
   this.setState({loading: false})

  }

  handleSubmit(event, id) {
    event.preventDefault()
    this.props.removeItem(id)
  }

  render() {
    
    const orderDetails = this.props.cart.OrderDetails
    const ord = orderDetails.map(item => {
      return item.quantity
    })

    return (
      this.state.loading ? 
      <h1>No cart.</h1> :
      <h1>Yes cart</h1> 
      
      
    )

  } //end of render
} // end of class component

const mapState = state => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    flower: state.flower,
    cart: state.cart, //cart
  };
};

const mapDispatch = dispatch => {
  return {
    getCartId: (id) => {
      dispatch(fetchCartId(id));
    },
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
    getMe: () => {
      dispatch(me());
    },
    removeItem: orderDetailId => {
      dispatch(removeItemFromCart(orderDetailId));
    }, 
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));
