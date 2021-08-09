import React from 'react';
import { connect } from 'react-redux';
import {fetchSingleFlower} from '../store/singleFlower';
import { fetchCart} from '../store/singleUser';
import { me } from "../store";
import { fetchAddCart, fetchAddToOrder, fetchUpdateFlower } from '../store/singleUser';

export class SingleFlower extends React.Component {
    constructor(props){
      super(props);
      this.state = { selectedQuantity: 0 }
    }
    componentDidMount(){
      this.props.getMe(); //thunk 
      this.props.getFlower(this.props.match.params.id)z
    }
    
    handleChange(event) {
      this.setState({
        selectedQuantity: event.target.value,
      });
      this.props.getCart(this.props.auth.id)
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      
      const userId = this.props.auth.id;
      const flowerId = parseInt(this.props.match.params.id);
      const quantity = parseInt(this.state.selectedQuantity);
      const orderId = await this.props.user[0].id
  
      console.log("in handleSubmit state:", this.state);
      console.log("in handleSubmit props:", this.props);
  
      //ADD CART : userId, flowerId, quantity
      if (this.props.user.length === 0) {
        console.log('Cart does not exist', this.props.user)
        this.props.addCart(userId, flowerId, quantity);
      }
  
      //If yes FALSE order and NO this flower
      //ADD TO ORDER : userId, orderId, flowerId, quantity
      else {
        console.log("Cart exists. orderId: ", this.props.user[0].id);
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
                <button onClick={e => this.handleSubmit(e)} className="button" >Add To Cart</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      auth: state.auth,
      flower: state.flower,
      user: state.user //cart
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getFlower: (id) => {dispatch(fetchSingleFlower(id))},
      getCart : (id) => {dispatch(fetchCart(id))},
      getMe : () => {dispatch(me())},
      addCart: (userId, flowerId, quantity) => {dispatch(fetchAddCart(userId, flowerId, quantity))},
      addToOrder: (userId, orderId, flowerId, quantity) => {dispatch(fetchAddToOrder(userId, orderId, flowerId, quantity))},

    };
  };
  
  export default connect(mapState, mapDispatch)(SingleFlower);
  