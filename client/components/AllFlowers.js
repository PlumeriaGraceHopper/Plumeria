import React from 'react';
import { connect } from 'react-redux';
import { fetchFlowers } from '../store/AllFlowers';
// import { Link } from 'react-router-dom';


export class AllFlowers extends React.Component {


  componentDidMount () {
      this.props.getFlowers();
  }

  render () {
      return (
          
        <div>
          <h1>All Flowers </h1>
            <div id="allFlowers">
                { this.props.flowers.map(flower => {
                    return ( <div id="flowerAF" key = {flower.id} >
                        <h2> {flower.name} </h2>
                        <div> <img src = {flower.image} /> </div>
                        <h3> ${flower.price }.00 </h3>
                        <h3> {flower.description } </h3>
                        <button id="addToCartButton">Add To Cart Once Cart Exists</button>
                    </div>)
                    
                }) }
            </div>
        </div>
      )
  }
}

const mapState = (state) => {
    return {
      flowers: state.flowers
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getFlowers: () => {dispatch(fetchFlowers())}
    };
  };
  
  export default connect(mapState, mapDispatch)(AllFlowers);
  