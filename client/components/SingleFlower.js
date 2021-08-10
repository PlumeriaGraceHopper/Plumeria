import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {me} from '../store/auth';
import {fetchSingleFlower} from '../store/singleFlower';
import { fetchCart, fetchAddCart, fetchAddToOrder, fetchUpdateFlower} from '../store/cart';

export class SingleFlower extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        selectedQuantity: 0 ,
      }
    }
    componentDidMount(){
      this.props.getFlower(this.props.match.params.id)

      console.log('SINGLE FLOWER PROPS',this.props)
    }
    
    handleChange(event) {
      this.setState({
        selectedQuantity: event.target.value,
      });

    }
  
    async handleSubmit(event,userId) {
      event.preventDefault();
      console.log("HANDLESUBMIT AUTH ID", userId)
      //const userId = this.props.auth.id;
      const flowerId = parseInt(this.props.match.params.id);
      const quantity = parseInt(this.state.selectedQuantity);
      
      //console.log("HANDLESUBMIT CART",this.props.cart)
  
      //ADD CART : userId, flowerId, quantity
      if (this.props.cart) {
        
        this.props.addCart(userId, flowerId, quantity);
      }
  
      //If yes FALSE order and NO this flower
      //ADD TO ORDER : userId, orderId, flowerId, quantity
      else {
        // const orderId = await this.props.cart.id
       
        this.props.addToOrder(userId, orderId, flowerId, quantity);
      }
      //If yes FALSE order and YES this flower
      //ADD FLOWER : userid, orderdetailid, quantity
    }

    render() {
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
                <button onClick={e => this.handleSubmit(e,this.props.auth.id)} className="button" >Add To Cart</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      auth: state.auth,
      flower: state.flower,
      cart: state.cart //cart
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getMe : () => {dispatch(me())},
      getFlower: (id) => {dispatch(fetchSingleFlower(id))},
      getCart : (id) => {dispatch(fetchCart(id))},
      addCart: (userId, flowerId, quantity) => {dispatch(fetchAddCart(userId, flowerId, quantity))},
      addToOrder: (userId, orderId, flowerId, quantity) => {dispatch(fetchAddToOrder(userId, orderId, flowerId, quantity))},

    };
  };
  
  export default withRouter(connect(mapState, mapDispatch)(SingleFlower));
  