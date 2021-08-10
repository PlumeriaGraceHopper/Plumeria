import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {fetchSingleFlower} from '../store/singleFlower';
import { fetchCart, fetchAddCart, fetchAddToOrder, fetchUpdateFlower} from '../store/cart';

export class SingleFlower extends React.Component {
<<<<<<< HEAD
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
      this.setState({addedToCartMessage: ''})
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
              this.setState({addedToCartMessage: `Low Stock: Please add ${parseInt(this.props.flower.quantity) - parseInt(pastQuantity)} or fewer.`});
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
            this.setState({addedToCartMessage: "Flower quantity updated!"});
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
        })
        this.setState({addedToCartMessage: "Flower(s) added to cart!"});
      })();
       
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }
=======
    constructor(props){
      super(props);
      this.state = { 
        selectedQuantity: 0 
      }
    }
    componentDidMount(){
      this.props.getFlower(this.props.match.params.id)
      this.props.getCart(window.localStorage.token)
    }
    
    handleChange(event) {
      this.setState({
        selectedQuantity: event.target.value,
      
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const cart = this.props.cart
      const orderId = this.props.cart.id
      const token = window.localStorage.token
      const flowerId = parseInt(this.props.match.params.id);
      const quantity = parseInt(this.state.selectedQuantity);
      const orderDetailArr = this.props.cart.OrderDetails.filter((element) => {
        if (element.flowerId === flowerId) {
          console.log("FLOWER CHECK", element.flowerId, flowerId)
          return element.id
        }
      } ); 
      const orderDetailId = orderDetailArr[0].id

      console.log("WHAT IS OD ID", orderDetailId)
      //find if flowerid is in flowerid of order detail
>>>>>>> f4ef51daa58d29096857efe47d645eb33010ca60

      if (cart && orderDetailId ) {  //if both cart and flower UPDATE QUANT
        //token, orderDetail, quantity
        console.log("UPDATE FLOWER", cart)
        this.props.updateFlowerQuantity (token, orderDetailId, quantity )
      
      } else if (cart) { //if cart, add ORDERDETAIL 
        this.props.addToOrder(token, orderId, flowerId, quantity)
        console.log("ADDED TO ORDER", cart)
      }
      
      else { //if no cart
        this.addCart(token, flowerId, quantity)
      }

    }
    
  
      render() {
      console.log("USERCART WORKS!!!",this.props.cart)
      const { name, image, price, description, quantity } = this.props.flower;
      
      let quantityArr = [];
      for (let i = 0; i <= quantity; i++) {
        quantityArr.push(i);
      }
      let renderQuant = quantityArr.map((num) => 
        <option key={num}>{num}</option>
      );
        return(
            <div id="singleflower">
                <h2>{name}</h2>
                <div><img src={image} /></div>
                <h3>${price/100}</h3>
                <h3>{description}</h3>
                <div id="quantitySelect">Quantity: 
                  <select name="selectedQuantity" value = {this.state.selectedQuantity} onChange={e => this.handleChange(e)} >
                    {renderQuant}
                  </select>
                </div>
                <button onClick={e => this.handleSubmit(e)} className="button" >Add To Cart</button>
            </div>
        )
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


const mapState = (state) => {
    return {
      flower: state.flower,
      cart: state.cart //cart
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getMe : () => {dispatch(me())},
      getFlower: (id) => {dispatch(fetchSingleFlower(id))},
      getCart : (token) => {dispatch(fetchCart(token))},
      addCart: (token,flowerId, quantity) => {dispatch(fetchAddCart(token, flowerId, quantity))},
      addToOrder: (token, orderId, flowerId, quantity) => {dispatch(fetchAddToOrder(token, orderId, flowerId, quantity))},
      updateFlowerQuantity : (token, orderDetail, quantity) => {dispatch(fetchUpdateFlower(token, orderDetail, quantity))}
    };
  };


export default withRouter(connect(mapState, mapDispatch)(SingleFlower));
