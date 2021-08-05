import React from 'react';
import { connect } from 'react-redux';
import {fetchSingleFlower} from '../store/singleFlower'

export class SingleFlower extends React.Component {
    componentDidMount(){
        this.props.getFlower(this.props.match.params.id)
    }

    render(){
      const { name, image, price, description, } = this.props.flower;
        return(
            <div id="singleflower">
                <h2>{name}</h2>
                <div><img src={image} /></div>
                <h3>${price/100}</h3>
                <h3>{description}</h3>
                <div id="quantitySelect">Quantity: <select name="quantity" id="quantity">
                          <option value="0">0</option>
                        </select></div>
                        <button className="button">Add To Cart Once Cart Exists</button>
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
  