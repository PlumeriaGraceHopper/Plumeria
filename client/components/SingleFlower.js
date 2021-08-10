import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSingleFlower } from "../store/singleFlower";
import { fetchCart } from "../store/singleUser";
import { me } from "../store";
import {
  fetchAddCart,
  fetchAddToOrder,
  fetchUpdateFlower,
} from "../store/singleUser";

export class SingleFlower extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedQuantity: 0, addedToCartMessage: '' };
  }
  componentDidMount() {
    this.props.getFlower(this.props.match.params.id);
    console.log("SINGLE FLOWER PROPS", this.props);
  }

  handleChange(event) {
    this.setState({
      selectedQuantity: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log;
    if (this.props.isLoggedIn) {
      console.log("you're logged in!");
      // let userId = this.props.auth.id;
      // const flowerId = parseInt(this.props.match.params.id);
      // const quantity = parseInt(this.state.selectedQuantity);

      // //ADD CART : userId, flowerId, quantity
      // if (this.props.user.length === 0) {
      //   this.props.addCart(userId, flowerId, quantity);
      // }

      // //If yes FALSE order and NO this flower
      // //ADD TO ORDER : userId, orderId, flowerId, quantity
      // else {
      //   const orderId = await this.props.user[0].id;

      //   this.props.addToOrder(userId, orderId, flowerId, quantity);
    } else {
      const { id, name, image, price } = this.props.flower;
      const quantity = this.state.selectedQuantity;
      const cartInLocalStorage = localStorage.getItem("cart");

      const items = (() => {
        
        return cartInLocalStorage === null
        ? []
        : JSON.parse(cartInLocalStorage)
      })();

      const addItems = (() => {
        if (quantity === 0){
          this.setState({addedToCartMessage: "Please select a quantity to add."}) 
          return;
        }

        
        
        for (let i = 0; i < items.length; i++) {
          let existingId = items[i].id;
          if (existingId === id) {
            let pastQuantity = items[i].quantity
            console.log(parseInt(this.props.flower.quantity) - parseInt(pastQuantity))
            if (parseInt(quantity) > (parseInt(this.props.flower.quantity) - parseInt(pastQuantity))){
              window.alert(`Low Stock: Please add ${parseInt(this.props.flower.quantity) - parseInt(pastQuantity)} or fewer.`)
              return;
            }
            items.splice(i, 1)
            items.push({
              id: id,
              image: image,
              name: name,
              price: price,
              quantity: parseInt(quantity) + parseInt(pastQuantity),
              totalStock: parseInt(this.props.flower.quantity)
            });
            return;
          }
        }
        items.push({
          
          id: id,
          image: image,
          name: name,
          price: price,
          quantity: quantity,
          totalStock: parseInt(this.props.flower.quantity)
        });
      })();

      localStorage.setItem("cart", JSON.stringify(items));
    }
  }

  render() {
    const { name, image, price, description, quantity } = this.props.flower;

    let quantityArr = [];
    for (let i = 0; i <= quantity; i++) {
      quantityArr.push(i);
    }
    let renderQuant = quantityArr.map(num => <option key={num}>{num}</option>);
    return (
      <div id="singleflower">
        <h2>{name}</h2>
        <div>
          <img src={image} />
        </div>
        <h3>${price / 100}</h3>
        <h3>{description}</h3>
        <div id="quantitySelect">
          Quantity:
          <select
            name="selectedQuantity"
            value={this.state.selectedQuantity}
            onChange={e => this.handleChange(e)}
          >
            {renderQuant}
          </select>
        </div>
        <button onClick={e => this.handleSubmit(e)} className="button">
          Add To Cart
        </button>
        {this.state.addedToCartMessage}
      </div>
    );
  }
}

const mapState = state => {
  return {
    auth: state.auth,
    flower: state.flower,
    user: state.user,
    isLoggedIn: !!state.auth.id, //cart
  };
};

const mapDispatch = dispatch => {
  return {
    getFlower: id => {
      dispatch(fetchSingleFlower(id));
    },
    // getCart : (id) => {dispatch(fetchCart(id))},
    // getMe : () => {dispatch(me())},
    addCart: (userId, flowerId, quantity) => {
      dispatch(fetchAddCart(userId, flowerId, quantity));
    },
    addToOrder: (userId, orderId, flowerId, quantity) => {
      dispatch(fetchAddToOrder(userId, orderId, flowerId, quantity));
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(SingleFlower));
