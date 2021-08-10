import React from "react";
import { Link } from "react-router-dom";


export function GuestCart() {
  let guestCart = JSON.parse(localStorage.getItem("cart"));

  function getTotalPrice() {
    let total = 0;

    guestCart.map(item => {
      let flowerPrice = item.price;
      total += flowerPrice * item.quantity;
    });

    let dividedTotal = total / 100;
    let decimalTotal = dividedTotal.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    return decimalTotal;
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

          {guestCart.map((item, idx) => {
            //This for loop and renderQuant variable are to put the amount the user has in their cart into the editable dropdown
            let quantityArr = [];
            for (let i = 0; i <= item.quantity; i++) {
              quantityArr.push(i);
            }
            let renderQuant = quantityArr.map(num => (
              <option key={num}>{num}</option>
            ));

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
                <button type="button" onClick = {() => {
                    guestCart.splice(idx, 1) 
                    localStorage.setItem("cart", JSON.stringify(guestCart))
                
                }}> Delete Flower</button>
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
      <Link to="/login">
            <button className="button" type="button">Sign In to Complete Order</button>
            {/* This should be done on the login page - if there is cart in local storage, add it to our database cart! 
            ALSO NEEDS TO HAPPEN IF THEY SIGN UP.  */}
          </Link>
    </div>
  );
}
