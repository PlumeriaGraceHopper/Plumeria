import React from 'react';
import { connect } from 'react-redux';
import {fetchSingleFlower} from '../store/singleFlower'

export class SingleFlower extends React.Component {
    constructor(props){
      super(props);
      this.state = { selectedQuantity: 0 }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
      this.props.getFlower(this.props.match.params.id)
    }
    
    handleChange = (event) => {
      this.setState({
        selectedQuantity : event.target.value
      })
      console.log('what is the selectedQuantity?', this.state.selectedQuantity, typeof(this.state.selectedQuantity) )
    }

    handleSubmit = (event) => {
      event.preventDefault();
    }

    render(){
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
                <button onSubmit={e => this.handleSubmit(e)} className="button" >Add To Cart</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      flower: state.flower
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getFlower: (id) => {dispatch(fetchSingleFlower(id))}

    };
  };
  
  export default connect(mapState, mapDispatch)(SingleFlower);
  