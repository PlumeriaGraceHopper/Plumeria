import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, removeItemFromCart } from "../store/singleUser";
import { fetchFlowers } from "../store/allFlowers";

import { me } from "../store";

export class Cart extends React.Component {
  componentDidMount() {

    // this.props.getCart(this.props.match.params.userId);
    this.props.getFlowers();
  }

  handleSubmit(event, id) {
    event.preventDefault()
    this.props.removeItem(id)
  }

  getTotalPrice(){
    let total = 0

    this.props.user.map(item => {
      return item.OrderDetails.map(detail => {
        let flower = this.props.flowers.filter(
          flower => flower.id === detail.flowerId
        );
        return (
          total += parseInt(flower.map(info => info.price).join(''))*parseInt(flower.map(info => info.quantity).join(''))
        );
      });
    })

    let dividedTotal = total/100

    let decimalTotal = dividedTotal.toLocaleString('en-us', {
      style: 'currency',
      currency: 'USD'
    })

    //let decimal = decimalTotal.findIndexOf('.')
    return decimalTotal
  }

  render() {
    console.log('PROPS IN CART:', this.props)
    const { isLoggedIn } = this.props;
    return (
      <div>
        <h1>your cart</h1>
        {/* this should but does not work with this.props.user[0].map? 
            double map is probably not idea, but we can refactor. 
            now that we're getting the flowerId, how do we use that to render the flowers? */}
        {/* maybe we can look at this in code review #2 if we have time! :)  */}
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>Flower</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Edit</td>
              <td>Remove Item</td>
            </tr>
            
            {this.props.user.map(item => {
              return item.OrderDetails.map(detail => {
                let flower = this.props.flowers.filter(
                  flower => flower.id === detail.flowerId
                );
                let quantity = detail.quantity;
                return (
                  <tr key={detail.id}>
                    <td>
                      {flower.map(info => (
                        <img className="orderImage" src={info.image} />
                      ))}
                    </td>
                    <td> {flower.map(info => info.name)}</td>
                    <td>{quantity}</td>
                    <td>${flower.map(info => info.price*info.quantity) / 100} @ {flower.map(info => info.price/100)} per unit </td>
                    <td>
                      <div>
                        <select name="quantity" id="quantity">
                          <option value="0">0</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <button onClick = {(e, id = detail.id) => {this.handleSubmit(e, id)}}> Delete Flower</button>
                    </td>
                  </tr>
                );
              });
            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="2" id="totalrow">
              Total: {this.getTotalPrice()}
            </td>
          </tbody>
        </table>

        {isLoggedIn ? (
          <Link to="/payment">
            <button className="button" type="button">Checkout</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="button" type="button">Sign In to Complete Order</button>
          </Link>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    flowers: state.flowers,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    // getCart: id => {
    //   dispatch(fetchCart(id));
    // },
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
    loadInitialData() {
      dispatch(me());
    },
    removeItem: orderDetailId => {
      dispatch(removeItemFromCart(orderDetailId));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));
