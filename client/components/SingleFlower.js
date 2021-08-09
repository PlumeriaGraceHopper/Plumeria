import React from 'react';
import { connect } from 'react-redux';
import {fetchSingleFlower} from '../store/singleFlower';
import { fetchUser } from '../store/singleUser';
import { me } from "../store";

export class SingleFlower extends React.Component {
    constructor(props){
      super(props);
      this.state = { selectedQuantity: 0 }
    }
    componentDidMount(){
      this.props.getMe();
      this.props.getFlower(this.props.match.params.id)

      // console.log("PROPS",this.props)
      // console.log("STATE", this.state) //local state
    }
    
    handleChange = (event) => {
      this.setState({
        selectedQuantity : event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const currentUser = (this.props.auth.id).toString();
      this.props.getUser(currentUser);
    }

    render(){
      console.log(this.props.auth.id)
      const { name, image, price, description, quantity } = this.props.flower;
      
      let quantityArr = [];
      for (let i = 0; i <= quantity; i++) {
        quantityArr.push(i);
      }
      let renderQuant = quantityArr.map((num) => 
        <option key={num}>{num}</option>
      );
      console.log("---RENDERQUANT---", renderQuant)
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
      user: state.user
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getFlower: (id) => {dispatch(fetchSingleFlower(id))},
      getUser : (id) => {dispatch(fetchUser(id))},
      getMe : () => {dispatch(me())},

    };
  };
  
  export default connect(mapState, mapDispatch)(SingleFlower);
  