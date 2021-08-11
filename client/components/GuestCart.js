import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function GuestCart(props) {
  let guestCart = JSON.parse(localStorage.getItem("cart"));

  //using this as a workaround to get the delete button to re-render the page
  const [value, setValue] = useState(1);

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

  const [selectedQuantity, setSelectedQuantity] = useState([1]);

  function handleChange(e) {
    setSelectedQuantity(e.target.value);
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
            for (let i = 1; i <= item.totalStock; i++) {
              quantityArr.push(i);
            }

            let renderQuant = quantityArr.map(num => (
              <option value={num}>{num}</option>
            ));

            return (
              <tr>
                {/* /////////////////Image, Name, Current Quantity, Price/////////////////// */}
                <td>
                  <Link to={`/flowers/${item.id}`}>
                    {" "}
                    <img className="orderImage" src={item.image} />{" "}
                  </Link>
                </td>

                <td>
                  <Link to={`/flowers/${item.id}`}>{item.name}</Link>
                </td>

                <td>{item.quantity}</td>

                <td>
                  {((item.price * item.quantity) / 100).toLocaleString(
                    "en-us",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                  <br />@<br />
                  {(item.price / 100).toLocaleString("en-us", {
                    style: "currency",
                    currency: "USD",
                  })}
                  per unit
                </td>
                {/* ///////////////////////Quantity Dropdowns//////////////////////// */}
                {/*///////Quantity Dropdown///////*/}
                <td>
                  <div id="quantitySelect">
                    <select
                      key={item.id}
                      name="selectedQuantity"
                      value={selectedQuantity}
                      onChange={e => handleChange(e)}
                    >
                      {renderQuant}
                    </select>
                  </div>

                  {/*///////Submit New Quantity Button///////*/}
                  <button
                    type="button"
                    onClick={() => {
                      if (item.quantity === selectedQuantity) {
                        return;
                      }

                      guestCart.push({
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        price: item.price,
                        quantity: selectedQuantity,
                        totalStock: item.totalStock,
                      });
                      guestCart.splice(idx, 1);
                      localStorage.setItem("cart", JSON.stringify(guestCart));
                      setValue(value + 1);
                    }}
                  >
                    Update Quantity
                  </button>
                </td>
                {/* ///////////////////////Delete Button//////////////////////// */}
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      guestCart.splice(idx, 1);
                      localStorage.setItem("cart", JSON.stringify(guestCart));
                      setValue(value + 1);
                    }}
                  >
                    Delete From Cart
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
      <Link to="/login">
        <button className="button" type="button">
          Log In to Complete Order
        </button>
        {/* This should be done on the login page - if there is cart in local storage, add it to our database cart! This should also happen if they sign up. */}
      </Link>
    </div>
  );
}

export default GuestCart;
