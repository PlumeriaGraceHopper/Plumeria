import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, removeItemFromCart, fetchUpdateFlower } from "../store/cart";
import { fetchFlowers } from "../store/allFlowers";

import { me } from "../store";

function Cart(props) {
  const [value, setValue] = useState(1);
  //setValue(value + 1)  <--- use to re-render


  const [selectedQuantity, setSelectedQuantity] = useState([1]);

  function handleChange(e) {
    setSelectedQuantity(e.target.value);
  }

  function handleSubmitQuantity(e, token, orderDetailId, quant) {
    e.preventDefault()
    console.log('in handle submit quant', token)
    props.updateItem(token, orderDetailId, quant)
    setValue(value + 1)
  }

  function handleSubmitDelete(e, token, orderDetailId) {
    e.preventDefault()
    console.log('order ID in handle delete', orderDetailId)
    props.removeItem(token, orderDetailId)
    setValue(value + 1)
  }

  //handleSubmit WORKS in that it hits the PUT route, but it's giving me a 401 Unauthorized error. 


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
            let orderDetail = detail.id

            //quantityArr and renderQuant deal with the Update Quantity dropdown:
            let quantityArr = [];
            for (let i = 1; i <= flower.map(i=>i.quantity); i++) {
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
                  <select
                      key={detail.id}
                      name="selectedQuantity"
                      value={selectedQuantity}
                      onChange={e => handleChange(e)}
                    >
                      {renderQuant}
                    </select>
                    <button type="button" onClick={(e, token = (window.localStorage.token), orderDetailId = (detail.id), quant=selectedQuantity) => handleSubmitQuantity(e, token, orderDetailId, quant)}>Update Quantity</button>
                  </div>
                </td>
                <td>
                  <button onClick={(e, token = (window.localStorage.token), orderDetailId = orderDetail) => handleSubmitDelete(e, token, orderDetailId)}> Delete Flower</button>
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
    removeItem: (token, orderDetailId) => {
      dispatch(removeItemFromCart(token, orderDetailId));
    },
    updateItem: (token, orderDetail, quantity) => {
      dispatch(fetchUpdateFlower(token, orderDetail, quantity))
    }
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