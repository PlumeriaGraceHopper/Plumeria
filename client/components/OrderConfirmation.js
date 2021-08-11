import React from "react";
import { Link } from "react-router-dom";

class Confirm extends React.Component {
  render() {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <Link to="/">Return to Home Page</Link>
      </div>
    );
  }
}

export default Confirm;
