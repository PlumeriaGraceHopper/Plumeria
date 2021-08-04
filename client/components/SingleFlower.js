import React from 'react';
import { connect } from 'react-redux';
import {fetchSingleFlower} from '../store/singleFlower'

export class SingleFlower extends React.Component {
    componentDidMount(){
        this.props.getFlower(this.props.match.params.id)
    }

    render(){
        return(
            <div id="singleflower">
                <h2>{this.props.flower.name}</h2>
                <div><img src={this.props.flower.image} /></div>
                <h3>${this.props.flower.price}.99</h3>
                <h3>{this.props.flower.description}</h3>
                <div id="quantitySelect">Quantity: <select name="quantity" id="quantity">
                          <option value="0">0</option>
                        </select></div>
                        <button id="addToCartButton">Add To Cart Once Cart Exists</button>
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
  