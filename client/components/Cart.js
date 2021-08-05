import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/singleUser";
import { fetchFlowers } from "../store/allFlowers";

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.match.params.userId);
    this.props.getFlowers();
  }

  render() {
    return (
      <div>
        <h1>your cart</h1>
        {/* this should but does not work with this.props.user[0].map? 
            double map is probably not idea, but we can refactor. 
            now that we're getting the flowerId, how do we use that to render the flowers? */}
            {/* maybe we can look at this in code review #2 if we have time! :)  */}
        <table>
        <tr>
          <td></td>
          <td>Flower</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>
        {this.props.user.map(item => {
          return item.OrderDetails.map(detail => {
            let flower = this.props.flowers.filter(
              flower => flower.id === detail.flowerId
            );
            return (
                  <tr key={detail.id}>
                    <td>
                      {flower.map(info => (
                        <img className="orderImage" src={info.image} />
                      ))}
                    </td>
                    <td> {flower.map(info => info.name)}</td>
                    <td>{flower.map(info => info.quantity)}</td>
                    <td>{flower.map(info => info.price)}</td>
                  </tr>
            );
          });
        })}
        </table>

        <button className="button">Checkout once we let ya</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
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
  };
};

export default connect(mapState, mapDispatch)(Cart);
