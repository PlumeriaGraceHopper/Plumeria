import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, removeItemFromCart } from "../store/cart";
import { fetchFlowers } from "../store/allFlowers";

import { me } from "../store";

function Cart(props) {
  const [value, setValue] = useState(1);
  //setValue(value + 1)  <--- use to re-render


//Planning to come back to this - currently crashes code. 
//Seems to encounter same issue where it's trying to run before we actually get the code. I have a couple theories for solution but don't want to prioritize this right now. 
//  function getTotal() {
//   let total = 0;

//   props.cart.OrderDetails.map(detail => {
//     let flower = props.flowers.filter(
//       flower => flower.id === detail.flowerId
//     );

//     let quantity = detail.quantity;
//     let flowerPrice = flower.map(i => i.price)

//     let subTotal = quantity * flowerPrice
//     total += subTotal
//     })
    
//     return total
//  }

//  let subTotal = getTotal()


  return (
    <div>
      <tr>
        <td></td>
        <td>Flower</td>
        <td>Quantity</td>
        <td>Price</td>
        <td>Edit</td>
        <td>Remove Item</td>
      </tr>
      {props.cart.id
        ? props.cart.OrderDetails.map(detail => {
            let flower = props.flowers.filter(
              flower => flower.id === detail.flowerId
            );

            let quantity = detail.quantity;

            //quantityArr and renderQuant deal with the Update Quantity dropdown:
            let quantityArr = [];
            for (let i = 1; i <= quantity; i++) {
              quantityArr.push(i);
            }

            let renderQuant = quantityArr.map(num => (
              <option value={num}>{num}</option>
            ));

            return (
              <tr key={detail.id}>
                <td>
                  {flower.map(info => (
                    <img className="orderImage" src={info.image} />
                  ))}
                </td>
                <td> {flower.map(info => info.name)}</td>
                <td>{quantity}</td>
                <td>
                  ${flower.map(info => info.price * info.quantity) / 100} @
                  {flower.map(info => info.price / 100)} per unit
                </td>
                <td>
                  <div>
                    <select name="quantity" id="quantity">
                      {renderQuant}
                    </select>
                    <button>Update Quantity</button>
                  </div>
                </td>
                <td>
                  <button> Delete Flower</button>
                </td>
              </tr>
            );
          })
        : "Cart Cannot Be Found."}
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colSpan="2" id="totalrow">
        Total: $0.00 placeholder
      </td>
      <Link to="/payment">
        <button className="button" type="button">
          Checkout
        </button>
      </Link>
    </div>
  );
}

const mapState = state => {
  return {
    cart: state.cart,
    flowers: state.flowers,
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: id => {
      dispatch(fetchCart(id));
    },
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
    loadInitialData() {
      dispatch(me());
    },
    removeItem: orderDetailId => {
      dispatch(removeItemFromCart(orderDetailId));
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));

//GET TOTAL FUNCTION CODE For my reference: 
    // let total = 0;

    // props.cart.OrderDetails.map(detail => {
    //   let flower = props.flowers.filter(
    //     flower => flower.id === detail.flowerId
    //   );

    //   let quantity = detail.quantity;
    //   let flowerPrice = flower.map(i => i.price)

    //   let subTotal = quantity * flowerPrice
    //   total += subTotal
    //   })


//     let dividedTotal = total / 100;

//     let decimalTotal = dividedTotal.toLocaleString("en-us", {
//       style: "currency",
//       currency: "USD",
//     });

//     return decimalTotal;