import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchSingleFlower } from "../store/singleFlower";
import { me } from "../store";
import {
  fetchCart,
  fetchAddCart,
  fetchAddToOrder,
  fetchUpdateFlower,
} from "../store/cart";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});

export class SingleFlower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuantity: 0,
      addedToCartMessage: "",
    };
  }
  componentDidMount() {
    this.props.getFlower(this.props.match.params.id);
    this.props.getCart(window.localStorage.token);
  }
  handleChange(event) {
    this.setState({
      selectedQuantity: event.target.value,
    });
  }
  ///////////////////////////////START OF HANDLE SUBMIT////////////////////////////////////
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      // ----------------- logged in code below  --------
      const cart = this.props.cart || 0;
      //const orderId = this.props.cart.id;
      const token = window.localStorage.token;
      const flowerId = parseInt(this.props.match.params.id);
      const quantity = parseInt(this.state.selectedQuantity);

      if (this.state.selectedQuantity === 0) {
        this.setState({
          addedToCartMessage: "Please select a quantity to add.",
        });
        return;
      }

      //find if flowerid is in flowerid of order detail
      if (cart !== 0) {
        const OrderDetail = this.props.cart.OrderDetails.filter(element => {
          element.flowerId === flowerId;
        }); // orderDetailArr will hold the matched flower in cart otherwise return 0
        if (OrderDetail.length > 0) {
          // && orderDetail not 0 aka UpdateOldFlower
          this.props.updateFlowerQuantity(token, OrderDetail[0].id, quantity);
        } else {
          //if only cart !==0 aka cart exists aka addNewFlower
          this.props.addToOrder(token, cart.id, flowerId, quantity);
          this.setState({ addedToCartMessage: "Flower(s) added to cart!" });
        }
      } else {
        //else if cart===0 aka cart not exists
        this.props.addCart(token, flowerId, quantity);
      } // -----------logged in code above --------------g
    } else {
      //if a user is not logged in; guest cart;
      this.setState({ addedToCartMessage: "" });
      const { id, name, image, price } = this.props.flower;
      const quantity = this.state.selectedQuantity;
      const cartInLocalStorage = localStorage.getItem("cart");
      const items = (() => {
        return cartInLocalStorage === null
          ? []
          : JSON.parse(cartInLocalStorage);
      })();
      const addItems = (() => {
        if (quantity === 0) {
          this.setState({
            addedToCartMessage: "Please select a quantity to add.",
          });
          return;
        }
        for (let i = 0; i < items.length; i++) {
          let existingId = items[i].id;
          if (existingId === id) {
            let pastQuantity = items[i].quantity;
            if (
              parseInt(quantity) >
              parseInt(this.props.flower.quantity) - parseInt(pastQuantity)
            ) {
              this.setState({
                addedToCartMessage: `Low Stock: Please add ${
                  parseInt(this.props.flower.quantity) - parseInt(pastQuantity)
                } or fewer.`,
              });
              return;
            }
            items.splice(i, 1);
            items.push({
              id: id,
              image: image,
              name: name,
              price: price,
              quantity: parseInt(quantity) + parseInt(pastQuantity),
              totalStock: parseInt(this.props.flower.quantity),
            });
            this.setState({ addedToCartMessage: "Flower quantity updated!" });
            return;
          }
        }
        items.push({
          id: id,
          image: image,
          name: name,
          price: price,
          quantity: quantity,
          totalStock: parseInt(this.props.flower.quantity),
        });
        this.setState({ addedToCartMessage: "Flower(s) added to cart!" });
      })();
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }
  ///////////////////END OF HANDLESUBMIT/////////////////////////////////////////
  render() {
    const { name, image, price, description, quantity } = this.props.flower;
    let quantityArr = [];
    for (let i = 0; i <= quantity; i++) {
      quantityArr.push(i);
    }
    let renderQuant = quantityArr.map(num => <option key={num}>{num}</option>);
    return (
      <Box m={50} justify="center" alignItems="center">
        <Card className={styles.title}>
          <Button>{name}</Button>
          <CardMedia component="img" height="400" image={image} title={name} />
          <Typography>${price / 100}</Typography>
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
          <Button onClick={e => this.handleSubmit(e)}>Add To Cart</Button>
          <Typography>{this.state.addedToCartMessage}</Typography>
        </Card>
      </Box>
    );
  }
}
const mapState = state => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    flower: state.flower,
    cart: state.cart, //cart
  };
};
const mapDispatch = dispatch => {
  return {
    getMe: () => {
      dispatch(me());
    },
    getFlower: id => {
      dispatch(fetchSingleFlower(id));
    },
    getCart: token => {
      dispatch(fetchCart(token));
    },
    addCart: (token, flowerId, quantity) => {
      dispatch(fetchAddCart(token, flowerId, quantity));
    },
    addToOrder: (token, orderId, flowerId, quantity) => {
      dispatch(fetchAddToOrder(token, orderId, flowerId, quantity));
    },
    updateFlowerQuantity: (token, orderDetail, quantity) => {
      dispatch(fetchUpdateFlower(token, orderDetail, quantity));
    },
  };
};
export default withRouter(connect(mapState, mapDispatch)(SingleFlower));
