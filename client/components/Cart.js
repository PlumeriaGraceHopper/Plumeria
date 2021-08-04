import React from 'react';
import { connect } from 'react-redux';
import {fetchCart} from '../store/singleUser';

export class Cart extends React.Component {
    componentDidMount (){
        this.props.getCart(this.props.match.params.id) 
    }

    render(){
        return(
            <div id="cart">
                <h1>{this.props.cart[0].userId}</h1>
            </div>
        )
    }

}

const mapState = (state) => {
    return {
        user: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        getCart: (id) => {dispatch(fetchCart(id))}
    };
};

export default connect(mapState, mapDispatch)(Cart);