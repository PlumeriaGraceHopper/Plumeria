import React from 'react';
import { connect } from 'react-redux';
import { fetchFlowers } from '../store/allFlowers';
import { Link } from 'react-router-dom';


export class AllFlowers extends React.Component {


  componentDidMount () {
      this.props.getFlowers();
      console.log("PROPS",this.props)
      console.log("STATE", this.state)
  }

  
  render () {
    const { flowers } = this.props;
      return (
        <div>
          <h1>All Flowers </h1>
            <div className="flower">
                { flowers.map(flower => {
                    return ( <div id="flowerAF" key = {flower.id} >
                      <Link to={`/flowers/${flower.id}`} className="flowerlink"><h2>{flower.name}</h2></Link>
                      <Link to={`/flowers/${flower.id}`} > <div> <img className="flowerImageMain" src = {flower.image} /> </div></Link>
                        <h3> ${flower.price/100}</h3>
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
  