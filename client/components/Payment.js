import React from "react";
import { Link } from "react-router-dom";

class Payment extends React.Component {
  render() {
    return (
      <div id="paymentpage">
        <h1>Please Enter Payment Details</h1>

        <label htmlFor="name">Card Holder's Name:</label>
        <input name="name" value="Fleur Flora" readOnly></input>
        <br />

        <label htmlFor="address">Address:</label>
        <input
          name="address"
          value="10 Flower Ave., Flower City"
          readOnly
        ></input>
        <br />

        <label htmlFor="card">Card Number:</label>
        <input name="card" value="8372658391093847" readOnly></input>
        <br />

        <Link to="/confirmation">
          <button className="button" type="button">
            Checkout
          </button>
        </Link>
      </div>
    );
  }
}

export default Payment;
