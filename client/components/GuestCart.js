import React from "react";

//this is where !isLoggedIn  handleSubmit() will go - so the handleSubmit() will call this function if the user isn't logged in. (will add logic for that later!)

export function GuestCart() {
  let guestCart = JSON.parse(localStorage.getItem("cart"));

  function getTotalPrice(){
      let total = 0

      guestCart.map(item => {
          let flowerPrice = item.price
          total += flowerPrice * item.quantity
      })

    let dividedTotal = total/100
    let decimalTotal = dividedTotal.toLocaleString('en-us', {
      style: 'currency',
      currency: 'USD'
    })
    return decimalTotal
  }




  return guestCart === null ? (
    "No items in cart."
  ) : (
    <div>
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

          {guestCart.map(item => {
                let quantityArr = [];
                for (let i = 0; i <= item.quantity; i++) {
                  quantityArr.push(i);
                }
              
                let renderQuant = quantityArr.map(num => <option key={num}>{num}</option>);
            return (
              <tr>
                <td>
                  <img className="orderImage" src={item.image} />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  {(item.price * item.quantity) / 100} @ {item.price / 100} per
                  unit
                </td>
                <td>
                  
                  <div id="quantitySelect">
                Quantity:
                <select>
                    name="selectedQuantity"
                    {renderQuant}
                </select>
                        </div>
                </td>
                <td>
                  <button>
                    Delete Flower Someday
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="2" id="totalrow">
              Total: {getTotalPrice()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
